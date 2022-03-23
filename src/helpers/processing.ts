import { rejects } from 'assert';
import { resolve } from 'path';
import sharp from 'sharp';

const convert = async (name: string, height: number, width: number):Promise<boolean> => {
  await sharp(`./images/full/${name}.jpg`)
    .resize(width as unknown as number, height)
    .toFile(`./images/thumb/${name}_${width}_${height}.jpg`).then(()=>{
      return true
    }).catch((err)=>{
      
    })
    return false;
};
export default convert;
