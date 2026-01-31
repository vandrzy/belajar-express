import Product from "./productModel.js";


export const createProduct = async (data) => {
    return await Product.create(data);
};


export const updateProduct = async (id, userId, data) => {
    return await Product.findOneAndUpdate(
        {_id: id, user: userId}, data, {new: true}
    );
};

export const getAllProduct = async (sortBy, order, limit, offset) => {
    return await Product.find().sort({[sortBy]: order}).limit(limit).skip(offset);
};

export const getProductByUser = async (userId) => {
    return await Product.find({user: userId});
};

export const getProductById = async (id) => {
    return await Product.findById(id);
};

export const deleteProductById = async (id) => {
    return await Product.findByIdAndDelete(id);
};

export const deleteProductByUser = async (idUser) => {
    return await Product.deleteMany({user: idUser});
};