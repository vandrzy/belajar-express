import AppError from '../../utils/appError.js';
import {createUser, getUserByEmail, getUserById} from '../user/userRepository.js';
import bcrypt from 'bcrypt';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt.js';
import crypto from 'crypto';
import * as refreshTokenRepository from './refreshTokenRepository.js';

const SALT_ROUNDS = 10;

export const register = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const data = {username, email, password: hashedPassword};

    const user = await createUser(data)

    console.log(user);

    return {
        username: user.username,
        email: user.email
    };
}

export const login = async (email, password) => {
    const user = await getUserByEmail(email);
    if (!user) throw new AppError('Email atau password salah', 401);
    const passwordValidation = await bcrypt.compare(password, user.password);
    if (!passwordValidation) throw new AppError('Email atau password salah', 401);

    const token = generateToken(user.role, user.username, user.email);

    const refreshToken = generateRefreshToken(user._id);
    const refreshTokenHash = generateTokenHash(refreshToken);
    const refreshTokenModel = {
        userId: user._id,
        tokenHash: refreshTokenHash,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000)
    };
    await refreshTokenRepository.saveRefreshToken(refreshTokenModel);

    return {
        login: true,
        token,
        refreshToken
    };
}

export const refreshTokens = async (oldToken) => {
    const payload = verifyRefreshToken(oldToken);
    const refreshTokenHash = generateTokenHash(oldToken);
    const existingToken = await refreshTokenRepository.findRefreshToken(refreshTokenHash);
    if (!existingToken || existingToken.revokeAt) throw new AppError('Refresh token telah digunakan', 403);
    const user = await getUserById(payload.userId);
    if (!user) throw new AppError('User tidak ada', 404);
    existingToken.revokeAt = new Date();
    const newRefreshToken = generateRefreshToken(payload.userId);
    const newRefreshTokenHash = generateTokenHash(newRefreshToken);
    const newRefreshTokenModel = {
        userId: payload.userId,
        tokenHash: newRefreshTokenHash,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000)
    };
    existingToken.replaceByToken = newRefreshTokenHash;
    await existingToken.save();
    await refreshTokenRepository.saveRefreshToken(newRefreshTokenModel);
    const newAccessToken = generateToken(user.role, user.username, user.email);
    return {
        token: newAccessToken,
        refreshToken: newRefreshToken
    };
}

export const removeToken = async (token) => {
    const tokenHash = generateTokenHash(token);
    await refreshTokenRepository.usedToken(tokenHash);
}

const generateTokenHash = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
}

export const generateAdmin = async () => {
    const password = await bcrypt.hash('admin', SALT_ROUNDS);
    const admin = {
        username: 'admin',
        password,
        email: 'admin@ad.com',
        role: 'admin'
    };

    return await createUser(admin)
}
