import AppError from "../../utils/appError.js";


export const createUserRequest = (req, res, next) => {
    const {name, email, age} = req.body;

    if (!name || !email || !age){
        throw new AppError("Nama, email, umur harus diisi", 400);
    }

    req.body = {name, email, age};

    next();
}

export const updateUserRequest = (req, res, next) => {
    const data = req.body;

    if (!data){
        throw new AppError("Tidak ada data yang ingin diupdate", 400)
    }

    next();
}