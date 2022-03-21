import sharp from 'sharp';

const convert = async (name: string, height: number, width: number) => {
  await sharp(`./images/full/${name}.jpg`)
    .resize(width as unknown as number, height)
    .toFile(`./images/thumb/${name}_${width}_${height}.jpg`)
    .catch(function (err) {
      console.log('Error occured ', err);
    });
};
export default convert;
