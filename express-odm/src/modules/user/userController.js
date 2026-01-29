import * as userService from './userService.js'
import { successResponse } from '../../utils/response.js';

export const createUser = async (req, res, next) => {
    // console.log("req:", req);
    try {
        const {name, email, age} = req.body;
        const user = await userService.createUser(name, email, age);
        // console.log("res", res);
        res.status(201).json(successResponse(
            "Berhasil menambahkan user", user
        ));
    } catch (error) {
        next(error);
    }
}

export const getAllUser = async(req, res, next) => {
    try {
        const {shortBy, order, limit, offset} = req.validatedQuery;
        const users = await userService.getAllUser(shortBy, order, limit, offset);
        res.status(200).json(successResponse('Berhasil menampilkan user', users));
    } catch (error) {
        next(error);
    }
}

export const getUserById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userService.getUserById(id);
        res.status(200).json(successResponse('User ditemukan', user))
    } catch (error) {
        next(error);
    }
}

export const getUserByName = async(req, res, next) => {
    try {
        const {name} = req.validatedQuery;
        const user = await userService.getUserByName(name);
        res.status(200).json(successResponse('User ditemukan', user));
    } catch (error) {
        next(error);
    }
}

export const updateUserById = async (req, res, next) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const user = await userService.updateUserById(id, data);
        res.status(200).json(successResponse('User berhasil diupdate', user));
    }catch (error){
        next(error);
    }
}

export const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await userService.deleteUserById(id);
        res.status(200).json(successResponse('User berhasil dihapus'))
    } catch (error) {
        next(error);
    }
}

export const asignRole = async (req, res, next) => {
    try {
        const {userId, roleId} = req.params;
        const result = await userService.asignRole(userId, roleId);
        res.status(200).json(successResponse('Berhasil menambahkan role', result));
    } catch (error) {
        next(error);
    }
}

export const removeRole = async (req, res, next) => {
    try {
        const {userId, roleId} = req.params;
        const result = await userService.removeRole(userId, roleId);
        res.status(200).json(successResponse('Berhasil menghilangkan role', result));
    } catch (error) {
        next(error);
    }
}