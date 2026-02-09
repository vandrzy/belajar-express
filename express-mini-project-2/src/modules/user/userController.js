import { successResponse } from '../../utils/response.js';
import * as userService from './userService.js';

export const gelAllUsers = async (req, res, next,)=> {
    try {
        const users = await userService.getAllUsers();
        res.status(201).json(successResponse('Berhasil', users))
    } catch (error) {
        next(error);
    }
}

export const uploadAvatarUser = async (req, res, next) => {
    try {
        const image = req.file;
        const email = req.user.email;
        const result = await userService.uploadAvatarImage(email, image);
        res.status(200).json(successResponse('Berhasil menambahkan avatar', result));
    } catch (error) {
        next(error);
    }
}