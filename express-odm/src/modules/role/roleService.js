import * as roleRepository from './roleRepository.js'
import AppError from '../../utils/appError.js'


export const createRole = async (name) => {
    const checkRole = await roleRepository.getRoleByName(name);
    console.log(checkRole);
    if (checkRole) throw new AppError('Role sudah ada', 400);

    const role =  await roleRepository.createRole({name});
    return role;
}


export const getAllRole = async () => {
    const roles = await roleRepository.getAllRole();
    if (!roles) throw new AppError('Belum ada role dibuat', 400);
    return roles;
}


