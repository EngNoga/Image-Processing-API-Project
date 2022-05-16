# Image Processing Api Project

## Description:
Resize Image With Node.Js.

### Author:
Naglaa Mohammed Mohammed Hamed

### To Run My Project:
- you will Run These Scripts:
    1. npm install : to reinstall packages and dependencies in package.json
    2. npm run test
    3. npm run start
    4. npm run build
    5. in browser: /localhost:3000/api?filename=encenadaport&width=200&height=300
   

### Techs:
1. Node.js
2. TypeScript: Write Coding in .ts files
3. Jasmine: to work unit testing
4. Sharp: To resize image
5. Prettier and Eslint: to format Files
6. SuperTest:to test Endpoints
7. Express

### Websites used in this project
1. My Udacity Advanced track classroom.
2. Udacity Tutors
3. geeksforgeeks.org .


### OverView on built My project
1. Scripts that run in terminal
   - npm init -y
   - install prettier and Eslint
        - npm i prettier@1.19.1
        - npm i --save-dev prettier
        - npm i --save-dev eslint
        - npm i --save-dev eslint-plugin-prettier
        - npm i --save-dev eslint-config-prettier
   - install TypeScript
        - npm i typescript
        - npm i --save-dev typescript
        - npm i -g ts-node
        - npm i --save-dev ts-node
        - npm i --save-dev @types/node
   - install Jasmine
        - npm i jasmine
        - npm i jasmine-spec-reporter
        - npm i --save-dev @types/jasmine
   - install supertest
        - npm i supertest
        - npm i --save-dev @types/supertest
   - install express
        - npm i express
        - npm i --save-dev @types/express
        - npm i --save-dev nodemon
   - install Sharp
        - npm i sharp
        - npm i --save-dev @types/sharp
2. Edit package.json
   - Add scripts section
       "scripts": {
                   "lint": "eslint,--ext .ts",
                   "prettier": "prettier --config .prettierrc 'src/**/*.js' --write",
                   "test": "npm run build && npm run jasmine",
                   "build": "npx tsc",
                   "start": "nodemon src/index.ts",
                   "jasmine": "jasmine"
                  }
3. TypeScript Configuration file:
   - Add tsconfig.json
        - npx tsc --init
   - Edit tsconfig.json
        - target :"es6"
        - module:"commonjs"
        - "lib":["ES6","DOM"]
        - outDir : ./dist
        - strict :true
        - noImplicitAny : true
        - in last file add :   ,"exclude": ["node_modules", "./dist", "spec","tests"]
4. add report.ts
5. add jasmine.json 


### Ts Files
  - resizeimages.ts
      - this utility working with sharp package to resize an image 
      - it will take for arguments original image path and thumbnail image path and width and height
      - import sharp to can that use the sharp method tho resize image
  - index.ts
      - import Express to run server and routes
      - import fs to use file system modules
      - import path to use path modules
      - import resizeimage to use resizeimage method
      - path.resolve Get the absolute path
      - use readFile to read the entire file into buffer
      - use writeHead to sends a response header to the request ,and specify the content type
      - use .end to end the response process
  - validate.ts
      - UrlImageQuery: the interface to use the general variables name in class and return it from url query
      - checkImg_Path_Validate: use to check images paths and the image files and return Error Message if exist
      - getAvailableImageNames: return the images name without extension (.jpg)
      - isImageAvailable : check the file name query include on image name then the image name is available
      - isThumbAvailable : Check the thumbnail image is exist
      - getImgOriginalPath : Get Original image path after remove the extension
      - getImgThumbPath : Get Thumbnail image path after remove the extension

## Note:
 - the first update
    - update project ---> create validate.ts file in utilities folder to separate cases Image paths and cases the
      Image Availability 
    - update package.json ---> script for eslint and prettier and update the devdependencies
    - update the .eslintrc.json to configure the eslint lib
 - the second update
    - add check exist the thumbnail image will return else will resize image
    - update the eslint script for checking the .ts and .js files
    - add checking image resize in indexSpec.ts test file
### Thank you, I hope I covered all that is wanted
### Good Luck.
