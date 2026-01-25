import * as userRepository from './userRepository.js';
import AppError from '../../utils/appError.js'


export const createUser = async (name, email, age) => {
    const data = {
        name,
        email,
        age
    };
    
    return await userRepository.createUser(data);
};


export const getAllUser = async() => {
    return await userRepository.getAllUser();
};

export const getUserById = async(id) => {
    const user = await userRepository.getById(id);
    if (!user) throw new AppError("User tidak ditemukan", 404);
    return user;
};

export const updateUserById = async(id, data) => {
    const user = await userRepository.updateUserById(id, data);
    if (!user) throw new AppError("User tidak ditemukan", 404);
    return user;
}

export const deleteUserById = async(id) => {
    const user = await userRepository.deleteUserById(id);
    if (!user) throw new AppError("User tidak ditemukan", 404);
}

