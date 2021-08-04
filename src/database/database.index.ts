import { LogMe } from '@/logger/logger.index';
import { ConnectionOptions, createConnection } from 'typeorm';
import { User } from './entity/user.entity';

const logger = new LogMe('database.index');
export class MyDatabase {
  private isProduction;

  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  getOptions = async (): Promise<ConnectionOptions> => {
    const connectionOptions: ConnectionOptions = {
      type: 'postgres',
      synchronize: true,
      logging: false,
      url: process.env.DATABASE_URL,
      extra: this.isProduction
        ? {
          ssl: {
            rejectUnauthorized: false
          }
        }
        : {},
      entities: [User]
    };

    return connectionOptions;
  };

  connect2Database = async (): Promise<void> => {
    try {
      const typeormconfig = await this.getOptions();
      await createConnection(typeormconfig);
      logger.info('Connection created correctly!');
    } catch (error) {
      logger.error(error);
    }
  };
}
