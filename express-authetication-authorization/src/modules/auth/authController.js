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
        const login = await authService.login(email, password);
        res.status(200).json(successResponse('Berhasil login', login));
    } catch (error) {
        next(error);
    }
}

export const generateAdmin = async (req, res, next) => {
    try {
        const result = await authService.generateAdmin();
        res.status(201).json(successResponse('Berhasil melakukan registrasi', result));
    } catch (error) {
        next(error);
    }
}