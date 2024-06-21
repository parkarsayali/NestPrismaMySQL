// import { Injectable } from '@nestjs/common';
// import BackBlazeB2 from 'backblaze-b2';
// import * as fs from 'fs';
// import * as util from 'util';

// const readFile = util.promisify(fs.readFile);

// @Injectable()
// export class BackblazeService {
//   private b2: BackBlazeB2;
//   private bucketId: string = process.env.BACKBLAZE_BUCKET_ID;

//   constructor() {
//     this.b2 = new BackBlazeB2({
//       applicationKeyId: process.env.BACKBLAZE_APIKEY_ID,
//       applicationKey: process.env.BACKBLAZE_APIKEY,
//     });
//   }

//   async uploadFile(
//     file: Express.Multer.File,
//     backBlazePath: string,
//   ): Promise<any> {
//     if (!file) {
//       throw new Error('No file provided');
//     }

//     try {
//       const fileBuffer = await readFile(file.path);

//       if (!fileBuffer || !fileBuffer.byteLength) {
//         throw new Error('File buffer is empty or invalid');
//       }
//       await this.b2.authorize();
//       const { data: uploadUrlData } = await this.b2.getUploadUrl({
//         bucketId: this.bucketId,
//       });

//       let folder = 'others';
//       if (file.mimetype.startsWith('image/')) {
//         folder = 'images';
//       } else if (file.mimetype.startsWith('video/')) {
//         folder = 'videos';
//       } else if (file.mimetype.startsWith('audio/')) {
//         folder = 'audios';
//       }

//       const fileNameWithPath = `${backBlazePath}/${folder}/${file.originalname}`;

//       const uploadResponse = await this.b2.uploadFile({
//         uploadUrl: uploadUrlData.uploadUrl,
//         uploadAuthToken: uploadUrlData.authorizationToken,
//         fileName: fileNameWithPath,
//         data: fileBuffer,
//       });

//       // await this.b2.updateFileVisibility({
//       //   fileId: uploadResponse.data.fileId,
//       //   visibility: 'public',
//       // });

//       return {
//         ...uploadResponse.data,
//         url: uploadResponse.config.url,
//       };
//     } catch (error) {
//       console.error('Error uploading file:', error.message);
//       throw new Error('Failed to upload file');
//     }
//   }
// }

import { Injectable } from '@nestjs/common';
import BackBlazeB2 from 'backblaze-b2';

@Injectable()
export class BackblazeService {
  private b2: BackBlazeB2;
  private bucketId: string = process.env.BACKBLAZE_BUCKET_ID;

  constructor() {
    this.b2 = new BackBlazeB2({
      applicationKeyId: process.env.BACKBLAZE_APIKEY_ID,
      applicationKey: process.env.BACKBLAZE_APIKEY,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    backBlazePath: string,
  ): Promise<any> {
    if (!file) {
      throw new Error('No file provided');
    }

    try {
      const fileBuffer = file.buffer;

      if (!fileBuffer || !fileBuffer.byteLength) {
        throw new Error('File buffer is empty or invalid');
      }

      await this.b2.authorize();
      const { data: uploadUrlData } = await this.b2.getUploadUrl({
        bucketId: this.bucketId,
      });

      let folder = 'others';
      if (file.mimetype.startsWith('image/')) {
        folder = 'images';
      } else if (file.mimetype.startsWith('video/')) {
        folder = 'videos';
      } else if (file.mimetype.startsWith('audio/')) {
        folder = 'audios';
      }

      const fileNameWithPath = `${backBlazePath}/${folder}/${file.originalname}`;

      const uploadResponse = await this.b2.uploadFile({
        uploadUrl: uploadUrlData.uploadUrl,
        uploadAuthToken: uploadUrlData.authorizationToken,
        fileName: fileNameWithPath,
        data: fileBuffer,
      });

      return {
        ...uploadResponse.data,
        url: uploadResponse.config.url,
      };
    } catch (error) {
      console.error('Error uploading file:', error.message);
      throw new Error('Failed to upload file');
    }
  }
}
