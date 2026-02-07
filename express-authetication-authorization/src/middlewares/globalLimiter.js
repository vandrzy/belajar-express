import rateLimit from "express-rate-limit";
import { failedResponse } from "../utils/response.js";
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        return res.status(429).json(failedResponse('Terlalu banyak request, coba lagi nanti'))
    }
});


export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    legacyHeaders: false,
    handler: (req, res) => {
        return res.status(429).json(failedResponse('Terlalu banyak request, coba lagi nanti'));
    }
});