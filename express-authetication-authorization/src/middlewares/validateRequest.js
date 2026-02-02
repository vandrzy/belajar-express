import AppError from "../utils/appError.js";

export const validateRequestBody = (schema) => (req, res, next) =>  {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        return next(new AppError('Request buruk', 400));
    };

    req.body = result.data;
    next();
};