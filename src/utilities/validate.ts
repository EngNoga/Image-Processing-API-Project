import express from 'express'; //import Express to run server and routes
import path from 'path'; // to use path modules
import { promises as fs } from 'fs'; //to use file system modules

interface UrlImageQuery {
  //use the interface to use the general variables name in class and return it from url query
  //the ? mark is the variables is optional
  filename?: string;
  width?: string;
  height?: string;
}

export default class Image {
  //specify the originalDir and thuumbDir
  //__dirname Get the directory path of the current module
  //path.resolve Get the absolute path
  static imageOriginalPath = path.resolve('images/full');
  static imageThumbPath = path.resolve('images/thumbnail');

  //this Method use to check images paths and the image files
  static async checkImg_Path_Validate(
    argQuery: UrlImageQuery
  ): Promise<null | string> {
    if (!(await Image.isImageAvailable(argQuery.filename))) {
      const availableImageNames: string = (
        await Image.getAvailableImageNames()
      ).join(', ');
      console.log(availableImageNames);
      return `Please Enter a valid filename in url query. \n 
              the images Name are: ${availableImageNames}.`;
    }

    //this covered the width and height is missing
    //return no thing
    if (!argQuery.width && !argQuery.height) {
      return null;
    }

    //this covered the width and height are Equal zero or less than zero (negative values)
    const width: number = parseInt(argQuery.width || '');
    if (Number.isNaN(width) || width < 1) {
      return 'Please Enter Number Greater then 0 for Width Argument in url query.';
    }

    //this covered the width and height are Equal zero or less than zero (negative values)
    const height: number = parseInt(argQuery.height || '');
    if (Number.isNaN(height) || height < 1) {
      return 'Please Enter Number Greater then 0 for Height Argument in url query.';
    }

    return null;
  }

  //this method return the images name without extension (.jpg)
  static async getAvailableImageNames(): Promise<string[]> {
    try {
      const imageName = (await fs.readdir(Image.imageOriginalPath)).map(
        (filename: string): string => filename.split('.')[0]
      );
      console.log(`the images name without extension \n ${imageName}`);
      return (await fs.readdir(Image.imageOriginalPath)).map(
        (filename: string): string => filename.split('.')[0]
      );
    } catch {
      return [];
    }
  }

  //this method return the file name query include on image name then the image name is available
  static async isImageAvailable(filename: string = ''): Promise<boolean> {
    if (!filename) {
      return false;
    }

    return (await Image.getAvailableImageNames()).includes(filename);
  }

  //Check the thumbnail image is exist
  static async isThumbAvailable(argQuery: UrlImageQuery): Promise<boolean> {
    if (!argQuery.filename || !argQuery.width || !argQuery.height) {
      return false;
    }

    const filePath: string = path.resolve(
      Image.imageThumbPath,
      `${argQuery.filename}_${argQuery.width}x${argQuery.height}.jpg`
    );
    console.log(filePath);
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  //Get Original image path after remove the extension

  static getImgOriginalPath(argQuery: UrlImageQuery): string {
    if (!argQuery.filename || !argQuery.width || !argQuery.height) {
    }
    argQuery.filename = (argQuery.filename as string).split('.')[0];
    console.log(argQuery.filename);
    const filePathOriginal: string = path.resolve(
      Image.imageOriginalPath,
      `${argQuery.filename}.jpg`
    );

    return filePathOriginal;
  }

  //Get Thumbnail image path after remove the extension
  static getImgThumbPath(argQuery: UrlImageQuery): string {
    if (!argQuery.filename || !argQuery.width || !argQuery.height) {
      return '';
    }
    argQuery.filename = (argQuery.filename as string).split('.')[0];
    const filePathThumb: string = path.resolve(
      Image.imageThumbPath,
      `${argQuery.filename}_${argQuery.width}x${argQuery.height}.jpg`
    );
    return filePathThumb;
  }
}
