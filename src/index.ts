import express from 'express'; //import Express to run server and routes
import fs from 'fs'; //to use file system modules
import path from 'path'; // to use path modules
import resizeImage from './utilities/resizeimages'; // to use resizeimage method
import validate from './utilities/validate'; // to use the Image file validation

// Start up an instance of app
const app = express();
// specify the localhost port number (Url: localhost:3000)
const port = 3000;

//Resize Image from  (sharp) utility
const resize = async (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  //return the width and height from the the url query and convert the string into numbers
  const imgQryWidth: number = parseInt(req.query.width as string);
  const imgQryHight: number = parseInt(req.query.height as string);

  //Get the original path and the thumbnail path from Image class in validate utility and print these in the console
  const imgOriginalPath: string = validate.getImgOriginalPath(req.query);
  const imgThumbnailPath: string = validate.getImgThumbPath(req.query);
  console.log('the Original image path \n' + imgOriginalPath);
  console.log('the Thumbnail image path \n' + imgThumbnailPath);

  //check the all cases for images and  paths
  //the return the error message and send into the browser
  const errorValidateMessage: null | string =
    await validate.checkImg_Path_Validate(req.query);
  if (errorValidateMessage) {
    res.send(errorValidateMessage);
    return;
  }

  //use the resizeImage function from the resizeimages utility file
  //to resize image using the sharp
  //check the the image is exist or not
  if (!(await validate.isThumbAvailable(req.query))) {
    await resizeImage(
      imgOriginalPath,
      imgThumbnailPath,
      imgQryWidth,
      imgQryHight
    );
  }

  next();
};

//to display the image after resize in the localhost
//use readFile to read the entire file into buffer
//use writeHead to sends a response header to the request ,and specify the content type
//use .end to end the response process

const readImage = async (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  //Get thumbnail path from Image class in validate utility
  const readImageThumb: string = validate.getImgThumbPath(req.query);
  //check the the image is exist or not
  if (!(await validate.isThumbAvailable(req.query))) {
    res.send('The thumbnail image is not found');
  }
  await fs.readFile(readImageThumb, function (err, data) {
    if (err) throw err;
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(data);
  });
  next();
};

//GET route
// get and send all data from  objects
app.get('/api', resize, readImage, (req, res) => {});

// setup server by listen function
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
