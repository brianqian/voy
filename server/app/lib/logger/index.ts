import winston from 'winston';

const { combine, timestamp, uncolorize, printf, simple } = winston.format;

const customFormat = printf(({ level, message, timestamp: privTimestamp }) => {
  return `${privTimestamp} [${level}] -- ${message}`;
});
export const logger = winston.createLogger({
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    // new winston.transports.Console({format: }),
    new winston.transports.File({
      filename: './app/logs/error.log',
      level: 'error',
      format: combine(timestamp(), uncolorize(), simple(), customFormat),
    }),
    new winston.transports.File({
      filename: './app/logs/combined.log',
      format: combine(timestamp(), uncolorize(), simple(), customFormat),
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: combine(timestamp(), simple(), customFormat),
    })
  );
}
