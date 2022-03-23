import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import fs from 'fs';
import convert from './helpers/processing';
dotenv.config();

const PORT = process.env.PORT || 3000;
// create an instance server
const app: Application = express();

// add routing for / path
app.get('/resize', async (req: Request, res: Response):Promise <void> => {
  const query = req.query;
  if (query.width && query.height && fs.existsSync(`./images/full/${query.name}.jpg`)) { 
    if (Number(query.height)>0 && Number(query.width)>0){
    if (fs.existsSync(`./images/thumb/${query.name}_${query.width}_${query.height}.jpg`)) {
      res.status(200).sendFile(`${query.name}_${query.width}_${query.height}.jpg`, { root: 'images/thumb/' });
    } else {
      await convert(
        query.name as unknown as string,
        parseInt(query.height as string),
        parseInt(query.width as string)
      );
      res.status(200).sendFile(`${query.name}_${query.width}_${query.height}.jpg`, { root: 'images/thumb/' });
    }

  }else{
    res.status(404).send(`Invalid input parameters width= ${query.width}, height= ${query.height}`);
  }
  } else {
    if (fs.existsSync(`./images/full/${query.name}.jpg`)) {
      res.status(200).sendFile(`${query.name}.jpg`, { root: 'images/full/' });
    } else if( query.name) {
      res.status(404).send(`${query.name} does not exist`);
    } else{
      res.status(200).send('Welcome to the resizing Endpoint');
  }
  }
});

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`);
});

export default app;
