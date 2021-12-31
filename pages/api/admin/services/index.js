import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Service from '../../../../models/Service';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const services = await Service.find({});
  await db.disconnect();
  res.send(services);
});

handler.post(async (req, res) => {
  await db.connect();
  const newService = new Service({
    name: 'sample name',
    slug: 'sample-slug-' + Math.random(),
    image: '/images/shirt1.jpg',
    price: 0,
    serviceCategory: 'sample service category',
    countInStock: 0,
    description: 'sample description',
  });

  const service = await newService.save();
  await db.disconnect();
  res.send({ message: 'Service Created', service });
});

export default handler;
