import { createLogger, format, Logger, transports } from 'winston';

export class LogMe {
  private logger: Logger;
  constructor(moduleName: string) {
    const { combine, timestamp, printf } = format;
    const isDevelopment = process.env.NODE_ENV !== 'production';
    const myFormat = printf(value => {
      return `${value.level} - ${value.label} : ${value.message}`;
    });

    this.logger = createLogger({
      level: isDevelopment ? 'debug' : 'error',
      format: combine(
        timestamp({ format: 'DD-MM-YYYY - HH:mm:ss' }),
        format.label({ label: moduleName }),
        myFormat
      ),
      transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new transports.Console()
      ]
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }
  error(message: string): void {
    this.logger.error(message);
  }
  log(level: string, message: string): void {
    this.logger.log(level, message);
  }
  debug(message: string): void {
    this.logger.debug(message);
  }
}
