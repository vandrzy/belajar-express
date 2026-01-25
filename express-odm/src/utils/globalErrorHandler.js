import {failedResponse} from './response.js';

const globalErrorHandler = (err, req, res, next) => {
    // console.log(err.name);
    // console.log(err.code)
    if (err.name === 'ValidationError'){
        return res.status(400).json(failedResponse(err.message, err.name));
    }

    if (err.name === 'MongoServerError') {
        return res.status(400).json(failedResponse(err.message, err.name));
    }

    console.error({
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
        time: new Date().toISOString()
    });

    const statusCode = err.statusCode || 500;

    const message = statusCode < 500 ? err.message : 'Internal server Error'

    res.status(statusCode).json(failedResponse(message, err.name));
}

export default globalErrorHandler;