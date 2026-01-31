import * as productRepository from './productRepository.js';
import * as userRepository from '../user/userRepository.js';
import AppError from '../../utils/appError.js';

export const createProduct = async (name, description, userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) throw new AppError('User tidak ada', 404);
    const data = {
        name,
        description,
        user: userId
    };
    const product = await productRepository.createProduct(data);
    return product;
}

export const getAllProducts = async (sortBy, order, limit, offset) => {
    const products = await productRepository.getAllProduct(sortBy, order, limit, offset);
    if (!products) throw new AppError('Produk tidak ada', 404);
    return products;
};

export const updateProduct = async (productId, userId, data) => {
    const product = await productRepository.updateProduct(productId, userId, data);
    if (!product) throw new AppError('Product tidak ada', 404);
    return product;
}

export const getProductByUser = async (userId) => {
    const products = await productRepository.getProductByUser(userId);
    if (!products) throw new AppError('Produk tidak ada', 404);
    return products
}

export const getProductById = async (id) => {
    const product = await productRepository.getProductById(id);
    if (!product) throw new AppError('Produk tidak ada', 404);
    return product;
}

export const deleteProductById = async (id) => {
    const deletedProduct = await productRepository.deleteProductById(id);
    if (!product) throw new AppError('Produk tidak ada', 404);
    return deletedProduct;
}