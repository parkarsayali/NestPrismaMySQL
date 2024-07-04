import { Injectable, Post } from '@nestjs/common';
// import users from './user.repository';
// import usersRepository from './user.repository';
import { Prisma } from '@prisma/client';
import UsersRepository from './users.repository';

@Injectable()
export class UserService {
  private items = [];

  async createUser(userData, fileData) {
    const newItem = {
      id: this.items.length + 1,
      ...userData,
      filename: fileData.filename,
    };
    this.items.push(newItem);
    return newItem;
  }

  async create(data: any, file) {
    console.log('data', data, file);
    const { user_id, name, age } = data;
    const userId = Number(user_id);
    const result = await UsersRepository.create({ ...data, user_id: userId });
    // console.log('create result', result);
    return { ...result, ...file };
  }
}
