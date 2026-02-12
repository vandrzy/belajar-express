import pinoHttp from "pino-http";
import { logger } from "../config/logger";
import { IncomingMessage, ServerResponse } from "node:http";

export const requestLogger = pinoHttp({
    logger,
    customLogLevel: (req: IncomingMessage, res: ServerResponse, err?: Error) => {
        if (res.statusCode >= 500) return "error";
        if (res.statusCode >= 400) return "warn";
        return "info"
    },
    serializers: {
        req(req) {
            return {
                method: req.method,
                url: req.url
            };
        },
        res(res){
            return {
                statusCode: res.statusCode
            }
        }
    }

})