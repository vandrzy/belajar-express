import AppError from "../utils/appError.js"


export const validateRequestBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success){
        return next(new AppError('Validation error', 400));
    }

    req.body = result.data;

    next();
}


export const validateRequestQuery = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success){
        return next(new AppError('Validation error', 400));
    }

    req.validatedQuery = result.data;

    next();
}