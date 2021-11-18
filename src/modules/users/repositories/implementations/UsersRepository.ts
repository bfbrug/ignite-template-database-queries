import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne(user_id, { 
      relations: ['games']
    });

    if(!user) {
      throw new Error('error');
    }

    return user;

    // Complete usando ORM
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query('SELECT first_name FROM users ORDER BY first_name'); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {

    const sql = `SELECT * FROM users WHERE LOWER(first_name) = LOWER('${first_name}')and  LOWER(last_name) = LOWER('${last_name}')`

    return this.repository.query(sql); // Complete usando raw query
  }
}
