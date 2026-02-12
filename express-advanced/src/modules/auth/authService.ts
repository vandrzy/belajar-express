import AppError from "../../utils/appError";
import { generateAccessToken, generateRefreshToken, validateRefreshToken } from "../../utils/jwt";
import { getUserByUsername, createUser } from "../user/userRepository";
import { loginResponse, refreshResponse, signUpResponse } from "./authDto";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { createRefreshToken, getRefreshTokenByHash } from "./refreshTokenRepository";

const SALT_ROUNDS = 10
export const signUp = async (username: string, email: string, password: string) : Promise<signUpResponse> => {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const data = {
        username, email, password: passwordHash 
    };
    const user = await createUser(data);

    return {
        username: user.username,
        email: user.email,
        role: user.role
    }
}

export const login = async (username: string, password: string): Promise<loginResponse> =>{
    const user = await getUserByUsername(username);
    if (!user) throw new AppError('Username atau Password salah', 404);
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new AppError('Username atau Password salah', 404);
    const accessToken = generateAccessToken(user.username, user.role);
    const refreshToken = generateRefreshToken(user.username);
    const refreshTokenModel = {
        tokenHash: generateTokenHash(refreshToken),
        userId: user._id,
        expiredAt: new Date(Date.now() + 8*60*60*1000)
    };
    await createRefreshToken(refreshTokenModel)

    return {
        login: true,
        accessToken,
        refreshToken
    };
}

export const refresh = async (token: string): Promise<refreshResponse> => {
    const existingToken = await getRefreshTokenByHash(generateTokenHash(token));
    if (!existingToken || existingToken.revokedAt) throw new AppError('Token tidak valid', 403);
    const payload = validateRefreshToken(token);
    const user = await getUserByUsername(payload.username);
    if (!user) throw new AppError('Token tidak valid', 403);
    existingToken.revokedAt= new Date();
    const newrefreshToken = generateRefreshToken(user.username);
    const newRefreshTokenModel = {
        userId: user._id,
        tokenHash: generateTokenHash(newrefreshToken),
        expiredAt: new Date(Date.now() + 8*60*60*1000)
    };
    existingToken.replacedByToken = newRefreshTokenModel.tokenHash;
    await Promise.all([
        existingToken.save(),
        createRefreshToken(newRefreshTokenModel)
    ]);

    const newAccessToken = generateAccessToken(user.username, user.role);
    return {
        accessToken: newAccessToken,
        refreshToken: newrefreshToken
    };
}

const generateTokenHash = (token: string): string => {
    return crypto.createHash('sha256').update(token).digest('hex');
}