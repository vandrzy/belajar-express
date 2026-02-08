import AppError from "../../utils/appError.js";
import { getAllUsers, getUserByEmail } from "./userRepository.js";
import uploadToCloudinary from "../../utils/uploadCloudinary.js";
import cloudinary from "../../config/cloudinary.js";

export const getAllUser = async () => {
    const users = await getAllUsers();
    if (users.length === 0) throw new AppError('User Belum ada', 404);
    const result = users.map((user) => toUserResponse(user))
    return result;
}

export const uploadAvatarImage = async (email, image) => {
    const user = await getUserByEmail(email);
    if (!user) throw new AppError('User tidak ada', 404);
    if (!image) throw new AppError('Avatar harus gambar', 400);
    if (user.imagePublicId !== 'Belum ada'){
        console.log('hapus gambar dulu');
        await cloudinary.uploader.destroy(user.imagePublicId);
    }

    const uploadResult = await uploadToCloudinary(image.buffer, 'user/profile');
    
    user.imageUrl = uploadResult.secure_url;
    user.imagePublicId = uploadResult.public_id;
    await user.save();

    return toUserResponse(user)
};


const toUserResponse = (user) => {
    return {
        username: user.username,
        email: user.email,
        role: user.role,
        imageUrl: user.imageUrl,
        imagePublicId: user.imagePublicId
    }
}