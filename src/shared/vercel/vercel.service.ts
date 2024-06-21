// import { Injectable } from '@nestjs/common';
// import { put } from '@vercel/blob';
// import * as fs from 'fs';
// import { promisify } from 'util';

// const readFile = promisify(fs.readFile);

// interface PutCommandOptions {
//   token: string;
//   contentType: string;
//   access: 'public'; // Define the access levels as needed
// }

// @Injectable()
// export class VercelService {
//   private token: string;

//   constructor() {
//     this.token = process.env.VERCEL_BLOB_TOKEN;
//   }

//   async uploadFile(
//     file: Express.Multer.File,
//     vercelPath: string,
//   ): Promise<any> {
//     const fileBuffer = await readFile(file.path);

//     const options: PutCommandOptions = {
//       token: this.token,
//       contentType: file.mimetype,
//       access: 'public', // or 'private', 'protected', etc. depending on your needs
//     };

//     let folder = 'others';
//     if (file.mimetype.startsWith('image/')) {
//       folder = 'images';
//     } else if (file.mimetype.startsWith('video/')) {
//       folder = 'videos';
//     } else if (file.mimetype.startsWith('audio/')) {
//       folder = 'audios';
//     }

//     const filePath = `${vercelPath}/${folder}/${file.originalname}`;

//     const uploadResult = await put(filePath, fileBuffer, options);

//     return uploadResult;
//   }
// }

import { Injectable } from '@nestjs/common';
import { put } from '@vercel/blob';

interface PutCommandOptions {
  token: string;
  contentType: string;
  access: 'public'; // Define the access levels as needed
}

@Injectable()
export class VercelService {
  private token: string;

  constructor() {
    this.token = process.env.VERCEL_BLOB_TOKEN;
  }

  async uploadFile(
    file: Express.Multer.File,
    vercelPath: string,
  ): Promise<any> {
    const fileBuffer = file.buffer;

    const options: PutCommandOptions = {
      token: this.token,
      contentType: file.mimetype,
      access: 'public', // or 'private', 'protected', etc. depending on your needs
    };

    let folder = 'others';
    if (file.mimetype.startsWith('image/')) {
      folder = 'images';
    } else if (file.mimetype.startsWith('video/')) {
      folder = 'videos';
    } else if (file.mimetype.startsWith('audio/')) {
      folder = 'audios';
    }

    const filePath = `${vercelPath}/${folder}/${file.originalname}`;

    const uploadResult = await put(filePath, fileBuffer, options);

    return uploadResult;
  }
}
