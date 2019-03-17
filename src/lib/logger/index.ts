import * as winston from 'winston';
import * as expressWinston from 'express-winston';

const logger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  expressFormat: true,
});

export default logger;
