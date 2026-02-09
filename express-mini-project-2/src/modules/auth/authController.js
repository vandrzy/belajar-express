import * as authService from './authService.js';
import {successResponse} from '../../utils/response.js'

export const registrasi = async(req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const result = await authService.registrasi(email, username, password);
        res.status(201).json(successResponse('Berhasil melakukan registrasi', result));
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const {login, refreshToken, accessToken} = await authService.login(email, password);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secureHost: process.env.NODE_ENV === 'prod',
            sameSite: 'strict'
        })
        res.status(200).json(successResponse('Berhasil login', {login, accessToken}));
    } catch (error) {
        next(error);
    }
}

export const refreshToken = async (req, res, next) => {
    try {
        const oldToken = req.cookies.refreshToken;
        const {accessToken, refreshToken} = await authService.refresh(oldToken);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secureHost: process.env.NODE_ENV === 'prod',
            sameSite: 'strict'
        });
        res.status(200).json(successResponse('Berhasil mendapatkan token', accessToken));
    } catch (error) {
        next(error);
    }
}

export const logout = async(req, res) => {
    const token = req.cookies.refreshToken;
    console.log('logout');
    
    if (token) {
        console.log('hapus');
        
        await authService.logout(token);
    }
    console.log('ok');
    
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