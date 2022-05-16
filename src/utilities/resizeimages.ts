import sharp from 'sharp';
/**
 * this utility working with sharp package to resize an image
 * it will take for arguments original image path and thumbnail image path and width and height
 * import sharp to can that use the sharp method tho resize image
 */
const resizeImage = async (
  originalPath: string,
  ThumbPath: string,
  width: number,
  height: number
): Promise<string> => {
  try {
    await sharp(originalPath)
      .resize(width, height)
      .toFormat('jpeg')
      .toFile(ThumbPath);
    return 'the image in resized';
  } catch {
    return 'there are problem in resize image';
  }
};

export default resizeImage;
