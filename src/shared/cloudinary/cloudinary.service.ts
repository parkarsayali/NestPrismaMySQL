// import { Injectable } from '@nestjs/common';
// import { UploadApiResponse, UploadApiErrorResponse, v2 } from 'cloudinary';

// @Injectable()
// export class CloudinaryService {
//   constructor() {
//     v2.config({
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//     });
//   }

//   async uploadImage(
//     filePath: string,
//     fileMimeType: string,
//     cloudinaryPath: string,
//   ): Promise<UploadApiResponse | UploadApiErrorResponse> {
//     // console.log('fileData', filePath, fileMimeType);

//     let folderName = 'docs';
//     if (fileMimeType.startsWith('image/')) {
//       folderName = 'images';
//     } else if (fileMimeType.startsWith('video/')) {
//       folderName = 'videos';
//     } else if (fileMimeType.startsWith('audio/')) {
//       folderName = 'audios';
//     }

//     const dynamicFolder = `${cloudinaryPath}/${folderName}`;

//     return new Promise((resolve, reject) => {
//       v2.uploader.upload(
//         filePath,
//         { folder: dynamicFolder, resource_type: 'auto', use_filename: true },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         },
//       );
//     });
//   }
// }

import { Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse, v2 } from 'cloudinary';
import { Stream } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(
    fileBuffer: Buffer,
    fileMimeType: string,
    cloudinaryPath: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    let folderName = 'docs';
    if (fileMimeType.startsWith('image/')) {
      folderName = 'images';
    } else if (fileMimeType.startsWith('video/')) {
      folderName = 'videos';
    } else if (fileMimeType.startsWith('audio/')) {
      folderName = 'audios';
    }

    const dynamicFolder = `${cloudinaryPath}/${folderName}`;

    return new Promise((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream(
        { folder: dynamicFolder, resource_type: 'auto', use_filename: true },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      const bufferStream = new Stream.PassThrough();
      bufferStream.end(fileBuffer);
      bufferStream.pipe(uploadStream);
    });
  }
}
