import AppError from '../utils/appError.js';
import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')){
        cb(null, true);
    }else{
        cb(new AppError('File harus berupa gambar', 400), false);
    }
}

export const upload = multer({
    storage,
    fileFilter,
    limits:{
        fieldSize: 5*1024*1024
    }
});