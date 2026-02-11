import * as authService from './authService';
import { asyncHandler } from '../../utils/asyncHandler';
import { Request, Response } from 'express';
import { successResponse } from '../../utils/response';
import { signUpRequest } from './authDto';

export const signUp = asyncHandler(async (req: Request<{}, {}, signUpRequest>, res: Response) => {
    const {username, email, password} = req.body;
    const user = await authService.signUp(username, email, password)

    res.status(201).json(successResponse('Berhasil membuat user', user))
}) 