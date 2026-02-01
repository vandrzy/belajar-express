import * as userService from './userService.js';
import { successResponse } from '../../utils/response.js';

export const createUser = async (req, res, next) => {
    try {
        const {name, email, age} = req.body;
        const user = await userService.createUser(name, email, age);
        res.status(201).json(successResponse('Berhasil membuat user', user))
    } catch (error) {
        next(error);
    }
}


export const updateUser = async (req, res, next) => {
    try {
        const data = req.body;
        const {id} = req.params;
        const user = await userService.updateUser(id, data);
        res.status(200).json(successResponse('Berhasil memperbarui user', user));
    } catch (error) {
        next(error);
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(successResponse('Berhasil mengambil data user', users));
    } catch (error) {
        next(error);
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await userService.getUserById(id);
        res.status(200).json(successResponse('User ditemukan', user));
    } catch (error) {
        next(error);
    }
}

export const deleteUserById =  async (req, res, next) => {
    try {
        const {id} = req.params;
        await userService.deleteUserById(id);
        res.status(200).json(successResponse('User dihapus'));
    } catch (error) {
        next(error);
    }
}