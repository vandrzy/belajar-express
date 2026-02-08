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

export const uploadAvatar = async(req, res, next) => {
    try {
        const image = req.file;
        const email = req.user.email;
        const result = await userService.uploadAvatarImage(email, image);
        res.status(200).json(successResponse('Berhasil menambahkan avatar', result))
    } catch (error) {
        next(error);
    }
}