import { ErrorRequestHandler } from "express";
import { failedResponse } from "./response";
const globalErrorHandler : ErrorRequestHandler = (err, req, res, next) => {
    console.error({
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
        timestamps: new Date().toISOString()
    });

    if (err.name === 'ValidationError') {
        return res.status(400).json(failedResponse(err.message, err.name));
    }
    if (err.name === 'MongoServerError') {
        return res.status(400).json(failedResponse(err.message, err.name));
    }
    if (err.name === 'MongooseError') {
        return res.status(400).json(failedResponse(err.message, err.name));
    }

    const statusCode: number =  err.statusCode || 500;

    const message: string = statusCode < 500 ? err.message : 'Internal Server Error!';
    const error: string = statusCode< 500 ? err.name : 'Server Error';

    res.status(statusCode).json(failedResponse(message, error));
}

export default globalErrorHandler;