import AppError from "../../utils/appError.js";
import Joi from "joi";
import z from "zod";

// validation menggunakan joi
export const createUserRequest = Joi.object({
    name: Joi.string().min(3).required().messages({
        "string.base": "nama harus berupa string",
        "string.empty": "nama tidak boleh kosong",
        "any.empty": "nama harus diisi"
    }),
    email: Joi.string().email().required(),
    age: Joi.number().min(1).required()
})
// .min(1) membuat minimal ada 1 field pada request body yang diisi

// validation menggunakan zod
export const updateUserRequest = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email("Format email tidak valid").optional(),
    age: z.number().min(1).optional()
})
.refine( // membuat minimal ada 1 field pada request body yang diisi
    data => Object.keys(data).length > 0,
    {message: "Tidak ada data yang dikirim"}
)
.refine(
    data => Object.values(data).some(value => value !== undefined),
    {message: "Data tidak terdefinisi"}
)





// export const createUserRequest = (req, res, next) => {
//     const {name, email, age} = req.body;

//     if (!name || !email || !age){
//         throw new AppError("Nama, email, umur harus diisi", 400);
//     }

//     req.body = {name, email, age};

//     next();
// }

// export const updateUserRequest = (req, res, next) => {
//     const data = req.body;

//     if (!data){
//         throw new AppError("Tidak ada data yang ingin diupdate", 400)
//     }

//     next();
// }