import User from "./userModel.js";

export const createUser = (data) => {
    return User.create(data);
}

export const getAllUser = (shortBy, order,limit, offset) => {
    return User.find().sort({[shortBy]: order}).limit(limit).skip(offset);
}

export const getById  = (id) => {
    return User.findById(id).populate('roles', 'name');
}

export const getByName = (name) => {
    const filter =  name ? {
        name: {$regex: name , $options: "i"} // mencari name sesuai dengan %name% options : "i" membuat pencarian bersifat caseinsensitive
    } : {};

    return User.find(filter);
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

export const addRoleToUser = async (userId, roleId) => {
    return await User.findByIdAndUpdate(
        userId, 
        {$addToSet: {roles: roleId},}, 
        {new: true}
    )
}

export const removeRoleFromUser = async (userId, roleId) => {
    return await User.findByIdAndUpdate(
        userId, 
        {$pull: {roles: roleId},}, 
        {new: true}
    )
}