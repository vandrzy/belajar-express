import * as authService from './authService.js';
import { successResponse } from '../../utils/response.js';

export const registerUser = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const user = await authService.register(username, email, password);
        res.status(201).json(successResponse('Berhasil melakukan registrasi', user));
    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const {login, token, refreshToken} = await authService.login(email, password);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })
        res.status(200).json(successResponse('Berhasil login', {login, token}));
    } catch (error) {
        next(error);
    }
}

export const refresh = async (req, res, next) => {
    try {
        const oldToken = req.cookies.refreshToken;
        const {token, refreshToken} = await authService.refreshTokens(oldToken);
        res.cookie(
            'refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });
        res.status(200).json(successResponse('Berhasil mendapatkan token', token))
    } catch (error) {
        next(error);
    }
}

export const logout = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (token) {
        await authService.removeToken(token);
    }
    res.clearCookie('refreshToken');
    res.status(204).end();
}

export const generateAdmin = async (req, res, next) => {
    try {
        const result = await authService.generateAdmin();
        res.status(201).json(successResponse('Berhasil melakukan registrasi', result));
    } catch (error) {
        next(error);
    }
}