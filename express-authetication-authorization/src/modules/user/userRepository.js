import User from "./userModel.js";


export const createUser = async (data) => {
    return await User.create(data);
}

export const getUserByEmail = async (email) => {
    return await User.findOne({email});
}

export const getAllUsers = async () => {
    return await User.find();
};

export const getUserById = async (id) => {
    return await User.findById(id);
};