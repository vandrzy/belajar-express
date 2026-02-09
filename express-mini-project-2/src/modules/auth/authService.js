import AppError from "../../utils/appError.js";
import { generateAccessToken, generateRefreshToken, validateRefreshToken } from "../../utils/jwt.js";
import { findUserByEmail, createUser } from "../user/userRepository.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { createRefreshToken, findTokenByHash, usedToken } from "./refreshTokenRepository.js";

const SALT_ROUNDS = 10;

export const registrasi = async(email, username, password) => {
    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const data = {
        email,
        username,
        password: hashPassword
    };

    const user = await createUser(data);

    return toUserResponse(user);
}

export const login = async(email, password)=>{
    const user = await findUserByEmail(email);
    if (!user) throw new AppError('Email atau password salah', 401);
    const passwordValidation = await bcrypt.compare(password, user.password);
    if (!passwordValidation) throw new AppError('Email atau password salah', 401);
    const accessToken = generateAccessToken(user.email, user.username, user.role);
    const refreshToken = generateRefreshToken(user.email);
    const refreshTokenHash = generateTokenHash(refreshToken);
    await createRefreshToken(user._id, refreshTokenHash, new Date(Date.now() + 8*60*60*1000))
    return {
        login: true,
        accessToken,
        refreshToken
    }
}

export const refresh = async (oldToken) => {
    const payload = validateRefreshToken(oldToken);
    const existingToken = await findTokenByHash(generateTokenHash(oldToken));
    if (!existingToken || existingToken.revokedAt) throw new AppError('Token tidak valid', 403);
    const user = await findUserByEmail(payload.email);
    if (!user) throw new AppError('Token tidak valid', 403);
    existingToken.revokedAt = new Date();
    const newRefreshToken = generateRefreshToken(user.email);
    existingToken.replacedBy = generateTokenHash(newRefreshToken);
    await existingToken.save();
    await createRefreshToken(user._id, generateTokenHash(newRefreshToken), new Date(Date.now() + 8*60*60*1000));
    const newAccessToken = generateAccessToken(user.email, user.username, user.role);
    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };
}

export const logout = async (token) => {
    await usedToken(generateTokenHash(token));
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

const generateTokenHash = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
}


const toUserResponse = (user) =>{
    return {
        username: user.username,
        email: user.email,
        role: user.role,
        imageUrl: user.imageUrl,
        imagePublicId: user.imagePublicId
    }
} 