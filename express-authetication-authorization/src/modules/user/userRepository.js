import User from "./userModel.js";


export const createUser = async (data) => {
    return await User.create(data);
}

export const getUserByEmail = async (email) => {
    return await User.findOne({email});
}