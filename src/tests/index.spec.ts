import supertest from 'supertest';
import app from '../index';
import convert from '../helpers/processing';
import fs from 'fs';
import { response } from 'express';
// create a request object
const request = supertest(app)

describe('Test endpoint response', () => {
  it('test endpoint response', async () => {
    const response = await request.get('/resize/')
    expect(response.status).toBe(200)
  })
  it('testing invalid image name',async ()=>{
    const response = await request.get('/resize?name=img&width=200&height=100');
    expect(response.status).toBe(404);
  })
  it('testing endpoint with correct query values',async ()=>{
    const response =await request.get('/resize?name=fjord&width=200&height=100');
    expect(response.status).toBe(200);
  })
})
describe('Testing converting image function',()=>{
  it('Convert with correct inputs',async ()=>{
    const name='fjord';
    const height=150;
    const width=300;
    await convert(name,height,width);
    expect(fs.existsSync(`./images/thumb/${name}_${width}_${height}.jpg`)).toBeTruthy();
  })
  it('Convert image with invalid name',async ()=>{
    const name='img';
    const height=150;
    const width=300;
    const response =await convert(name,height,width);
    expect(response).toBeFalsy();
  })
})