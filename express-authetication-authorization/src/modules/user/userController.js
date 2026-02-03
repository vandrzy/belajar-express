import { successResponse } from "../../utils/response.js";

export const getUserInfo = async (req, res, next) => {
    try {
        const user  = req.user;
        res.status(200).json(successResponse('Berhasil mengambil data user', user))
    } catch (error) {
        next(error);
    }
    
}