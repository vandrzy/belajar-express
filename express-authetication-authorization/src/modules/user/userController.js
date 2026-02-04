import { successResponse } from "../../utils/response.js";
import * as userService from './userService.js';

export const getUserInfo = async (req, res, next) => {
    try {
        const user  = req.user;
        res.status(200).json(successResponse('Berhasil mengambil data user', user))
    } catch (error) {
        next(error);
    }   
}

export const getAllUsers = async(req, res, next) => {
    try {
        const result = await userService.getAllUser();
        res.status(200).json(successResponse('Berhasil mengambil data user', result));
    } catch (error) {
        next(error);
    }
}