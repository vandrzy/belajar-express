import AppError from "../../utils/appError.js";
import { getAllUsers } from "./userRepository.js";

export const getAllUser = async () => {
    const users = await getAllUsers();
    if (users.length === 0) throw new AppError('User Belum ada', 404);
    const result = users.map((user) => toUserResponse(user))
    return result;
}


const toUserResponse = (user) => {
    return {
        username: user.username,
        email: user.email,
        role: user.role
    }
}