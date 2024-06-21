import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cloudinary')
export class ImageController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: string,
  ) {
    console.log('file', file);

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!userId) {
      throw new BadRequestException('No user ID provided');
    }

    try {
      const result = await this.cloudinaryService.uploadImage(
        file.buffer,
        file.mimetype,
        'Testing/01',
      );
      return result;
    } catch (error) {
      console.log('Error upload image:', error);
      throw new Error('Failed to upload file');
    }
  }
}
