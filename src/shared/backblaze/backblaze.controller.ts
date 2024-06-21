// src/upload/upload.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BackblazeService } from './backblaze.service';

@Controller('backblaze')
export class BackblazeController {
  constructor(private readonly backblazeService: BackblazeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // console.log('fileController', file);
    try {
      const result = await this.backblazeService.uploadFile(file, 'demo/01');
      return result;
    } catch (error) {
      console.log('Error upload image:', error);
      throw new Error('Failed to upload file');
    }
  }
}
