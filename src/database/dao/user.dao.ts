import { LogMe } from '@/logger/logger.index';
import { getConnection } from 'typeorm';
import { User } from '../entity/user.entity';

export class UserDao {
  private logger = new LogMe('user.dao');

  getAllUser = async (): Promise<User[] | undefined> => {
    let response;
    try {
      const connection = getConnection();
      const repository = connection.getRepository(User);
      response = await repository.find();
    } catch (error) {
      this.logger.error(error);
    }
    return response;
  };

  saveUser = async (user: User): Promise<User | undefined> => {
    let response;
    try {
      const connection = getConnection();
      const repository = connection.getRepository(User);
      response = await repository.save(user);
    } catch (error) {
      this.logger.error(error);
    }

    return response;
  };

  exist = async (username: string): Promise<boolean> => {
    const user = await this.getUser(username);
    return !!user;
  };

  getUser = async (username: string): Promise<User | undefined> => {
    let response;
    try {
      const connection = getConnection();
      const repository = connection.getRepository(User);
      response = await repository.findOne({ username });
    } catch (error) {
      this.logger.error(error);
    }
    return response;
  };

  deleteUser = async (username: string): Promise<boolean> => {
    let isOk = false;
    try {
      const connection = getConnection();
      const repository = connection.getRepository(User);
      const user = await this.getUser(username);
      if (user) {
        await repository.remove(user);
        isOk = true;
      }
    } catch (error) {
      this.logger.error(error);
    }
    return isOk;
  };
}
