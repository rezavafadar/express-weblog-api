import { IUploadImgOptions } from './../interfaces/uploader.interfaces';
import { IUploadService } from './../interfaces/services.interfaces';
import sharp, { FormatEnum } from 'sharp';

import path from 'path';

class Uploader implements IUploadService {
  private mainUploadPath: string;

  constructor(uploadPath: string) {
    this.mainUploadPath = uploadPath;
  }

  private createFilePath(filename: string) {
    return path.join(this.mainUploadPath, filename);
  }

  async uploadImg(
    dataBuffer: Buffer,
    filename: string,
    option: { format: keyof FormatEnum; options?: IUploadImgOptions },
  ): Promise<string> {
    const filepath = this.createFilePath(filename);

    await sharp(dataBuffer)
      .toFormat(option.format, option.options)
      .toFile(filepath);

    return filepath;
  }
}

export default Uploader;
