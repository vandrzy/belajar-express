import { failedResponse } from "./response.js";


const globalErrorHandler = (err, req, res, next) => {
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

    const statusCode = err.statusCode || 500;
    const message = statusCode < 500 ? err.message : 'Internal Server Error!';
    const errorName = statusCode < 500 ? err.name : 'Server Error';

    res.status(statusCode).json(failedResponse(message, errorName));
}

export default globalErrorHandler;