import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { validateAccessToken } from "../utils/jwt";

const authMiddlerware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if(!authorization) throw new AppError('Belum login', 401);
    const [type, token]= authorization.split(' ');
    if (type !== 'Bearer' || !token) throw new AppError('Belum login', 401);
    try {
        const payload = validateAccessToken(token);
        req.user = payload;
        next();
    } catch (error) {
        next(new AppError('Waktu login telah habis', 401));
    }
}

export default authMiddlerware;