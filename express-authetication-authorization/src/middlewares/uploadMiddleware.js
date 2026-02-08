import multer from "multer";
import AppError from '../utils/appError.js'

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')){
        cb(null, true);
    }else{
        cb(new AppError('FIle harus berupa gambar', 400), false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2*1024*1024
    }
})