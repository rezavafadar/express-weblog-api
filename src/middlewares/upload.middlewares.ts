import multer from 'multer';
import { ExceptionError } from '../exception/exceptionError';

class UploadMiddlewares {
  static uploadSingleImg(fieldname: string) {
    const multerUserProfileStorage = multer.memoryStorage();

    const userProfileUploader = multer({
      storage: multerUserProfileStorage,
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) cb(null, true);
        else cb(new ExceptionError('BadRequest!', 400, 'File is not image!'));
      },
    });
    return userProfileUploader.single(fieldname);
  }
}
export default UploadMiddlewares;
