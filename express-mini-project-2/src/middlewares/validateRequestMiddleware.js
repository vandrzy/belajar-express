import AppError from '../utils/appError.js';

export const validateRequestBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success){
        console.log(result.error.issues)
        
        return next(new AppError(result.error.issues, 400));
    }
    req.body = result.data;
    next();
};