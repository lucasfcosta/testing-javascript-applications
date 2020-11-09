const pino = require("pino");

const pinoInstance = pino();

const logger = {
  logInfo: pinoInstance.info.bind(pinoInstance),
  logError: pinoInstance.error.bind(pinoInstance)
};

module.exports = logger;
