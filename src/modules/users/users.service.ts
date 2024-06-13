import { Injectable, Post } from '@nestjs/common';

@Injectable()
export class UserService {
  private items = [];

  async createUser(userData, fileData) {
    const newItem = {
      id: this.items.length + 1,
      ...userData,
      filename: fileData,
    };
    this.items.push(newItem);
    return newItem;
  }
}
