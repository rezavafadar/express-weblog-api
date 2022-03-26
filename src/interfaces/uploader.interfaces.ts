import {
  AvifOptions,
  GifOptions,
  HeifOptions,
  JpegOptions,
  OutputOptions,
  PngOptions,
  TiffOptions,
  WebpOptions,
} from 'sharp';

export type IUploadImgOptions =
  | OutputOptions
  | JpegOptions
  | PngOptions
  | WebpOptions
  | AvifOptions
  | HeifOptions
  | GifOptions
  | TiffOptions;
