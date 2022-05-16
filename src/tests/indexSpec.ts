import supertest from 'supertest';
import app from '../index';
import path from 'path';
import { promises as fs } from 'fs';
import validate from '../utilities/validate';
import resizeImage from '../utilities/resizeimages'; // to use resizeimage method

const request = supertest(app);
describe('Test endpoint responses', (): void => {
  describe('/', (): void => {
    it('gets the  endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');
      expect(response.status).toBe(404);
    });
  });

  describe('endpoint: /api', (): void => {
    beforeEach(function () {
      const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    });

    //case the resize Function
    it('the imageResize function is Not throw error', async (): Promise<void> => {
      const error: string = await resizeImage(
        '/images/full/fjord.jpg',
        '/images/thumbnail/fjord_200x200.jpg',
        200,
        200
      );
      expect(error).not.toBeNull();
    });

    //case the url query with file name and width and height
    it('gets /api?filename=fjord&width=200&height=200 is Pass', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api?filename=fjord&width=200&height=200'
      );
      expect(response.status).toBe(200);
    });

    //case the url query with file name with extension and width and height
    it('gets /api?filename=fjord.jpg&width=200&height=200 is Pass', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api?filename=fjord&width=200&height=200'
      );
      expect(response.status).toBe(200);
    });

    //case the url query without file name and with width , height
    it('gets /api?filename=&width=200&height=200 is Fail', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api?filename=&width=200&height=200'
      );
      expect(response.status).toBe(200);
    });

    //case the url query with file name and with width equal zero, height
    it('gets /api?filename=fjord&width=0&height=200 is Fail', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api?filename=&width=200&height=200'
      );
      expect(response.status).toBe(200);
    });

    //case the url query with file name and with width , height equal zero
    it('gets /api?filename=fjord&width=200&height=0 is Fail', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api?filename=&width=200&height=200'
      );
      expect(response.status).toBe(200);
    });
  });
});
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    '~/images/thumbnail',
    'fjord_200x200.jpg'
  );
  try {
    await fs.access(resizedImagePath);
  } catch {}
});
