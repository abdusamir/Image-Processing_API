import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import fs from 'fs';
import convert from './helpers/processing';
dotenv.config();

const PORT = process.env.PORT || 3000;
// create an instance server
const app: Application = express();
// HTTP request logger middleware

// add routing for / path
app.get('/images/resize', async (req: Request, res: Response) => {
  const query = req.query;
  if (query.width && query.height && fs.existsSync(`./images/full/${query.name}.jpg`)) {
    if (fs.existsSync(`./images/thumb/${query.name}_${query.width}_${query.height}.jpg`)) {
      res.sendFile(`${query.name}_${query.width}_${query.height}.jpg`, { root: 'images/thumb/' });
    } else {
      await convert(
        query.name as unknown as string,
        parseInt(query.height as string),
        parseInt(query.width as string)
      );
      res.sendFile(`${query.name}_${query.width}_${query.height}.jpg`, { root: 'images/thumb/' });
    }
  } else {
    if (fs.existsSync(`./images/full/${query.name}.jpg`)) {
      res.sendFile(`${query.name}.jpg`, { root: 'images/full/' });
    } else {
      res.send(`${query.name} does not exist`);
    }
  }
});

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`);
});

export default app;
