import User from "./userModel.js";

export const findUserByEmail = async (email) => {
    return await User.findOne({email});
};

// data {username, email, passowr}
export const createUser = async (data) => {
    return await User.create(data);
};

export const getAll = async () => {
    return await User.find();
}