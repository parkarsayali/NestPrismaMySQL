// src/users/users.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'test',
      password: 'test',
    },
  ];

  async findOneByUsername(username: string): Promise<any> {
    return this.users.find((user) => user.username === username);
  }
}
