import * as authService from './authService';
import { asyncHandler } from '../../utils/asyncHandler';
import { Request, Response } from 'express';
import { successResponse } from '../../utils/response';
import { loginRequest, signUpRequest } from './authDto';

export const signUp = asyncHandler(async (req: Request<{}, {}, signUpRequest>, res: Response) => {
    const {username, email, password} = req.body;
    const user = await authService.signUp(username, email, password)

    res.status(201).json(successResponse('Berhasil membuat user', user))
}) 

export const login = asyncHandler(async (req: Request<{},{}, loginRequest>, res: Response) => {
    const {username, password} = req.body;
    const {login, refreshToken, accessToken} = await authService.login(username, password);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    res.status(200).json(successResponse('Berhasil login', {login, accessToken}));
})

export const refresh = asyncHandler(async (req: Request, res: Response)=> {
    const oldRefreshToken = req.cookies.refreshToken;
    const {accessToken, refreshToken} = await authService.refresh(oldRefreshToken);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    res.status(200).json(successResponse('Berhasil mendapatkan token baru', {accessToken}));
})