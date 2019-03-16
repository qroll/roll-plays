import bunyan from "bunyan";
import bunyanDebugStream from "bunyan-debug-stream";

import { LOG } from "../config";

const logger = bunyan.createLogger({
    name: "rollplays",
    stream: bunyanDebugStream({
        basepath: __dirname,
        forceColor: true
    }),
    level: LOG.LEVEL
});

class Logger {
    static debug(message) {
        logger.debug(message);
    }

    static info(message) {
        logger.info(message);
    }

    static error({ error, message }) {
        logger.error(error, message);
    }
}

export default Logger;
