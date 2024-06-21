import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VercelService } from './vercel.service';
// import { FileUploadService } from './file-upload.service';

@Controller('vercel')
export class VercelController {
  constructor(private readonly vercelService: VercelService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.vercelService.uploadFile(file, 'demo/01');
      return {
        url: result.url,
      };
    } catch (error) {
      console.log('Error upload image:', error);
      throw new Error('Failed to upload file');
    }
  }
}
