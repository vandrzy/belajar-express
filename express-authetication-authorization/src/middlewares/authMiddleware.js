import { verifyAccessToken } from "../modules/auth/jwtService.js";
import AppError from "../utils/appError.js";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(new AppError('Token tidak ada', 401));
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token){
        return next(new AppError('Token tidak valid', 401))
    }
    try {
        const decode = verifyAccessToken(token);
        req.user = decode;
        next();
    } catch (error) {
        next(new AppError ('Token tidak valid atau expired', 401));
    }

};

export default authMiddleware;