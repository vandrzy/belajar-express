import cloudinary from '../config/cloudinary.js';

export const uploadToCloudinary = (buffer, folder) => {
    return new Promise((resolve, reject)=> {
        cloudinary.uploader.upload_stream(
            {folder}, 
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        ).end(buffer);
    })
};

export const deleteFromCloudinary = async (id) => {
    await cloudinary.uploader.destroy(id);
};