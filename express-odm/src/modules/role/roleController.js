import * as roleService from './roleService.js'
import {successResponse} from '../../utils/response.js'


export const createRole = async (req, res, next) => {
    try {
        const name = req.body.name;
        const role = await roleService.createRole(name);
        res.status(200).json(successResponse('Berhasil membuat role baru', role))
    } catch (error) {
        next(error);
    }
}

export const getAllRole = async (req, res, next) => {
    try {
        const roles = await roleService.getAllRole();
        res.status(200).json(successResponse('Berhasil menampilkan role', roles))
    } catch (error) {
        next(error);
    }
}

