// import {
//   BadRequestException,
//   Body,
//   Controller,
//   Post,
//   Req,
//   UploadedFile,
//   UseInterceptors,
// } from '@nestjs/common';
// import { ProjectsService } from './projects.service';
// import path from 'path';
// import { diskStorage } from 'multer';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { Request } from 'express';
// import { CloudinaryService } from 'src/uploads/cloudinary/cloudinary.service';
// import { BackblazeService } from 'src/uploads/backblaze/backblaze.service';
// import { VercelService } from 'src/uploads/vercel/vercel.service';

// @Controller('project')
// export class ProjectController {
//   constructor(
//     private readonly projectsService: ProjectsService,
//     private readonly cloudinaryService: CloudinaryService,
//     private readonly backBlazeService: BackblazeService,
//     private readonly vercelService: VercelService,
//   ) {}

//   @Post('cloudinary')
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: './src/uploads',
//         filename: (req, file, cb) => {
//           //   console.log('file', file);
//           //   const alphaCode: string = req.body.alpha_code.replace(/\s/g, '');
//           const extension: string = path.parse(file.originalname).ext;
//           cb(null, `${file.originalname}${extension}`);
//         },
//       }),
//       limits: {
//         fileSize: 10 * 1024 * 1024, // 10 MB in bytes
//       },
//       //   fileFilter: (req, file, cb) => {
//       //     const allowedMimeTypes = [
//       //       'image/jpeg',
//       //       'image/jpg',
//       //       'image/png',
//       //       'video/mp4',
//       //       'video/mkv',
//       //       'video/x-matroska',
//       //       'video/avi',
//       //     ];
//       //     if (allowedMimeTypes.includes(file.mimetype)) {
//       //       cb(null, true);
//       //     } else {
//       //       cb(
//       //         new BadRequestException(
//       //           'Only jpg, jpeg, and png files are allowed',
//       //         ),
//       //         false,
//       //       );
//       //     }
//       //   },
//     }),
//   )
//   async createProjectCloudinary(
//     @Body() data: any,
//     @Req() req: Request,
//     @UploadedFile() file: Express.Multer.File,
//   ) {
//     // const { file, ...formData } = data;
//     const {
//       name,
//       pincode,
//       contact_no_1,
//       email_id_for_sales,
//       disclaimer,
//       contact_no_sales_1,
//     } = data;
//     try {
//       //   console.log('formdata', file);
//       const url = req.originalUrl;
//       const val = url.split('/')[1];
//       const folderName =
//         val.slice(0, 1).toUpperCase() + val.slice(1).toLowerCase();

//       const result = await this.projectsService.createProject({
//         name,
//         pincode,
//         contact_no_1,
//         email_id_for_sales,
//         disclaimer,
//         contact_no_sales_1,
//       });
//       const cloudinaryPath = `${folderName}/${result.project_id}`;
//       const upload = this.cloudinaryService.uploadImage(
//         file.path,
//         file.mimetype,
//         cloudinaryPath,
//       );
//       return upload;
//     } catch (error) {
//       console.log('Failed to create project:', error);
//       return {
//         statusCode: 500,
//         success: false,
//         errorMessage: error.message,
//       };
//     }
//   }

//   @Post('backblaze')
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: './src/uploads',
//         filename: (req, file, cb) => {
//           const extension: string = path.parse(file.originalname).ext;
//           cb(null, `${file.originalname}${extension}`);
//         },
//       }),
//       limits: {
//         fileSize: 10 * 1024 * 1024, // 10 MB in bytes
//       },
//     }),
//   )
//   async createProjectBackblaze(
//     @Body() data: any,
//     @Req() req: Request,
//     @UploadedFile() file: Express.Multer.File,
//   ) {
//     try {
//       const url = req.originalUrl.split('/')[1];
//       const folderName =
//         url.slice(0, 1).toUpperCase() + url.slice(1).toLowerCase();

//       const result = await this.projectsService.createProject(data);
//       const backBlazePath = `${folderName}/${result.project_id}`;
//       const upload = this.backBlazeService.uploadFile(file, backBlazePath);
//       return upload;
//     } catch (error) {
//       console.log('Failed to create project:', error);
//       return {
//         statusCode: 500,
//         success: false,
//         errorMessage: error.message,
//       };
//     }
//   }

//   @Post('vercel')
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: './src/uploads',
//         filename: (req, file, cb) => {
//           const extension: string = path.parse(file.originalname).ext;
//           cb(null, `${file.originalname}${extension}`);
//         },
//       }),
//       limits: {
//         fileSize: 10 * 1024 * 1024, // 10 MB in bytes
//       },
//     }),
//   )
//   async createProjectVercel(
//     @Body() data: any,
//     @Req() req: Request,
//     @UploadedFile() file: Express.Multer.File,
//   ) {
//     try {
//       const url = req.originalUrl.split('/')[1];
//       const folderName =
//         url.slice(0, 1).toUpperCase() + url.slice(1).toLowerCase();

//       const result = await this.projectsService.createProject(data);
//       const vercelPath = `${folderName}/${result.project_id}`;
//       //   const upload = this.backBlazeService.uploadFile(file, backBlazePath);
//       const upload = this.vercelService.uploadFile(file, vercelPath);
//       return upload;
//     } catch (error) {
//       console.log('Failed to create project:', error);
//       return {
//         statusCode: 500,
//         success: false,
//         errorMessage: error.message,
//       };
//     }
//   }
// }

import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { memoryStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { CloudinaryService } from 'src/shared/cloudinary/cloudinary.service';
import { BackblazeService } from 'src/shared/backblaze/backblaze.service';
import { VercelService } from 'src/shared/vercel/vercel.service';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly backBlazeService: BackblazeService,
    private readonly vercelService: VercelService,
  ) {}

  @Post('cloudinary')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB in bytes
      },
    }),
  )
  async createProjectCloudinary(
    @Body() data: any,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const {
      name,
      pincode,
      contact_no_1,
      email_id_for_sales,
      disclaimer,
      contact_no_sales_1,
    } = data;
    try {
      const url = req.originalUrl;
      const val = url.split('/')[1];
      const folderName =
        val.slice(0, 1).toUpperCase() + val.slice(1).toLowerCase();

      const result = await this.projectsService.createProject({
        name,
        pincode,
        contact_no_1,
        email_id_for_sales,
        disclaimer,
        contact_no_sales_1,
      });
      const cloudinaryPath = `${folderName}/${result.project_id}`;
      const upload = await this.cloudinaryService.uploadImage(
        file.buffer,
        file.mimetype,
        cloudinaryPath,
      );
      return upload;
    } catch (error) {
      console.log('Failed to create project:', error);
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  @Post('backblaze')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB in bytes
      },
    }),
  )
  async createProjectBackblaze(
    @Body() data: any,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const url = req.originalUrl.split('/')[1];
      const folderName =
        url.slice(0, 1).toUpperCase() + url.slice(1).toLowerCase();

      const result = await this.projectsService.createProject(data);
      const backBlazePath = `${folderName}/${result.project_id}`;
      const upload = await this.backBlazeService.uploadFile(
        file,
        backBlazePath,
      );
      return upload;
    } catch (error) {
      console.log('Failed to create project:', error);
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }

  @Post('vercel')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB in bytes
      },
    }),
  )
  async createProjectVercel(
    @Body() data: any,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const url = req.originalUrl.split('/')[1];
      const folderName =
        url.slice(0, 1).toUpperCase() + url.slice(1).toLowerCase();

      const result = await this.projectsService.createProject(data);
      const vercelPath = `${folderName}/${result.project_id}`;
      const upload = await this.vercelService.uploadFile(file, vercelPath);
      return upload;
    } catch (error) {
      console.log('Failed to create project:', error);
      return {
        statusCode: 500,
        success: false,
        errorMessage: error.message,
      };
    }
  }
}
