import AppError from "../utils/appError.js";

const authorizeRole = (...allowedRole) => (req, res, next) => {
    if (!req.user || !req.user.role){
        return next(new AppError('Login dahulu', 401));
    }
    if(!allowedRole.includes(req.user.role)){
        return next(new AppError('Akses ditolak', 403));
    }

    next();
}

export default authorizeRole;