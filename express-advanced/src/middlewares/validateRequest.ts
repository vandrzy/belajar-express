import {Request, Response, NextFunction, RequestHandler} from 'express';
import {ZodObject, ZodRawShape} from 'zod';
import AppError from '../utils/appError';

export const validateRequestBody = <T extends ZodRawShape>(schema: ZodObject<T>): RequestHandler =>
(req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if(!result.success){
        console.error({
            message: result.error.message,
            name: result.error.name
        })
        return next(new AppError('Request buruk', 400));
    };
    req.body = result.data;
    next();
};