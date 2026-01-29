import { Role } from "./roleModel.js";

export const createRole = async (data) => {
    return await Role.create(data);
}

export const getRoleByName = async (name) => {
    return await Role.findOne({name})
}

export const getRoleById = async (id) => {
    return await Role.findById(id);
}

export const getAllRole = async () => {
    return await Role.find();
}

export const updateRoleById = async (id, data) => {
    return await Role.findByIdAndUpdate(id, data, {new: true})
}

export const inputUserToRole = async (roleId, userId) => {
    return await Role.findByIdAndUpdate(
        roleId,
        {$addToSet: {users: userId}},
    );
}

export const removeUserFromRole = async (roleId, userId) => {
    return await Role.findByIdAndUpdate(
        roleId,
        {$pull: {users: userId}},
    );
}
