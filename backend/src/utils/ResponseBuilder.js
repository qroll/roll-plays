import ClientError from "./ClientError";
import ServerError from "./ServerError.js";

const MAP_STATUS_TO_MESSAGE = {
    200: "Ok",
    400: "Bad Request",
    500: "Internal Server Error"
};

export const errorBuilder = options => {
    let { message, error } = options;
    let status = options.status || error instanceof ClientError ? 400 : 500;
    let code = options.code || error instanceof ClientError ? 400 : 500;

    return {
        status: status,
        code: code,
        message: message || MAP_STATUS_TO_MESSAGE[status],
        error: error || new ServerError("An internal server error occurred")
    };
};

export const responseBuilder = options => {
    let { status = 200, code = 200, message, data = {} } = options;

    return {
        status: status,
        code: code,
        message: message || MAP_STATUS_TO_MESSAGE[status],
        data: data
    };
};
