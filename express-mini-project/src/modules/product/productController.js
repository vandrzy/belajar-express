import * as productService from './productService.js';
import { successResponse } from '../../utils/response.js';

export const createProduct = async (req, res, next) => {
    try {
        const {name, description, userId} = req.body;
        const product = await productService.createProduct(name, description, userId);
        res.status(201).json(successResponse('Berhasil menambahakan produk', product));
    } catch (error) {
        next(error);
    }
};

export const getAllProducts = async (req, res, next) => {
    try {
        const {sortBy, order, limit, offset} = req.validatedQuery;
        const products = await productService.getAllProducts(sortBy, order, limit, offset);
        res.status(200).json(successResponse('Berhasil mengambil data produk', products))
    } catch (error) {
        next(error);
    }
}

export const updateProduct= async (req, res, next) => {
    try {
        const {id} = req.params;
        const userId = req.validatedQuery.u;
        const data = req.body;
        const product = await productService.updateProduct(id, userId, data);
        res.status(200).json(successResponse('Berhasil memperbarui data produk', product));
    } catch (error) {
        next(error);
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await productService.getProductById(id);
        res.status(200).json(successResponse('Berhasil mengambil data produk', product));
    } catch (error) {
        next(error);
    }
}

export const getProductByUser = async (req, res, next) => {
    try {
        const {userId} = req.params;
        const products = await productService.getProductByUser(userId);
        res.status(200).json(successResponse('Berhasil mengambil data produk', products));
    } catch (error) {
        next(error);
    }
}

export const deleteProductById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const deletedProduct = await productService.deleteProductById(id);
        res.status(200).json(successResponse('Berhasil menghapus data produk', deletedProduct));
    } catch (error) {
        next(error);
    }
}