import User from "./userModel.js";

export const createUser = (data) => {
    return User.create(data);
}

export const getAllUser = (data) => {
    return User.find();
}

export const getById  = (id) => {
    return User.findById(id);
}

export const getByName = (name) => {
    return User.find({name});
}

export const updateUserById = (id, data) => {
    return User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
}

export const deleteUserById = (id) => {
    return User.findByIdAndDelete(id);
}

