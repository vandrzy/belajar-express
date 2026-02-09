import AppError from "../../utils/appError.js";
import * as cloudinaryUtils from '../../utils/cloudinaryUtils.js';
import { findUserByEmail, getAll } from "./userRepository.js";

export const getAllUsers = async () => {
    const users = await getAll();
    if(users.length === 0) throw new AppError('Belum ada user', 404);
    const result = users.map(user => toUserResponse(user));
    return result;
}

export const uploadAvatarImage = async (email, image) => {
    const user = await findUserByEmail(email);
    if (!user) throw new AppError('User tidak valid', 404);
    if (!image) throw new AppError('Avatar harus gambar', 400);
    if (user.imagePublicId !== null){
        await cloudinaryUtils.deleteFromCloudinary(user.imagePublicId);
    }
    const uploadResult = await cloudinaryUtils.uploadToCloudinary(image.buffer, 'user/profile');
    user.imageUrl = uploadResult.secure_url;
    user.imagePublicId = uploadResult.public_id;
    await user.save();

    return toUserResponse(user);
}


const toUserResponse = (user) =>{
    return {
        username: user.username,
        email: user.email,
        role: user.role,
        imageUrl: user.imageUrl,
        imagePublicId: user.imagePublicId
    }
} 