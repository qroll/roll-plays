import { responseBuilder, errorBuilder } from "./ResponseBuilder";
import Logger from "~/src/utils/Logger";

class BaseController {
    success(res, data, options = {}) {
        let responseInfo = responseBuilder({
            ...options,
            data
        });

        Logger.info(
            `${res.req.method} ${res.req.originalUrl} - ${responseInfo.message}`
        );

        res.status(responseInfo.status).json({
            code: responseInfo.code,
            message: responseInfo.message,
            data: responseInfo.data
        });
    }

    failure(res, error, options = {}) {
        let errorInfo = errorBuilder({
            ...options,
            error
        });

        Logger.error({
            error: errorInfo.error,
            message: `${res.req.method} ${res.req.originalUrl} - ${
                errorInfo.message
            }`
        });

        res.status(errorInfo.status).json({
            code: errorInfo.code,
            message: errorInfo.message,
            error: errorInfo.error
        });
    }
}

export default BaseController;
