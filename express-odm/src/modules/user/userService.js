import * as userRepository from './userRepository.js';
import AppError from '../../utils/appError.js';


export const createUser = async (name, email, age) => {
    const data = {
        name,
        email,
        age
    };
    
    return await userRepository.createUser(data);
};


export const getAllUser = async(sortBy, order, limit, offset) => {
    const orderValue = order === "asc" ? 1 : -1;
    return await userRepository.getAllUser(sortBy, orderValue, limit, offset);
};

export const getUserById = async(id) => {
    const user = await userRepository.getById(id);
    if (!user) throw new AppError("User tidak ditemukan", 404);
    return user;
};

export const getUserByName = async(name) => {
    const user = await userRepository.getByName(name);
    if (!user) throw new AppError("User tidak ditemukan", 404);
    return user;
}

export const updateUserById = async(id, data) => {
    const user = await userRepository.updateUserById(id, data);
    if (!user) throw new AppError("User tidak ditemukan", 404);
    return user;
}

export const deleteUserById = async(id) => {
    const user = await userRepository.deleteUserById(id);
    if (!user) throw new AppError("User tidak ditemukan", 404);
}

