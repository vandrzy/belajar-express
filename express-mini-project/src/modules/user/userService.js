import AppError from '../../utils/appError.js';
import * as userRepository from './userRepository.js';
import * as productRepository from '../product/productRepository.js';
import mongoose from 'mongoose';

export const createUser = async (name, email, age) => {
    const data = {name, email, age};
    const user = await userRepository.createUser(data);
    return user;
}

export const updateUser = async (id, data) => {
    const user = await userRepository.updateUser(id, data);
    if (!user) throw new AppError('User tidak ada', 404);
    return user
}

export const getAllUsers = async () => {
    const users = await userRepository.getAllUsers();
    if (!users) throw new AppError('User belum ada', 404);
    return users
}

export const getUserById = async (id) => {
    const user = await userRepository.getUserById(id);
    if (!user) throw new AppError('User tidak ada', 404);
    return user;
}

export const deleteUserById = async (userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new AppError('User tidak ada', 404);

    await productRepository.deleteProductByUser(userId);
    await userRepository.deleteUserById(userId);
}