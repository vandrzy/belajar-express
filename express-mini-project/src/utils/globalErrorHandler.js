import { failedResponse } from "./response.js"

export const globalErrorHandler = (err, req, res, next) => {
    console.error({
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
        timestamps: new Date().toISOString()
    });

    if (err.name === 'ValidationError'){
        return res(400).json(failedResponse(err.message, err.name))
    }
    if (err.name === 'MongoServerError'){
        return res(400).json(failedResponse(err.message, err.name))
    }

    const statusCode=err.statusCode || 500;

    const message = statusCode < 500 ? err.message: 'Internal server error';
    const errorName = statusCode < 500 ? err.name: null;

    res.status(statusCode).json(failedResponse(message, errorName));

}