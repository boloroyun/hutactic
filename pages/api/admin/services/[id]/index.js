import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import Service from '../../../../../models/Service';
import db from '../../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const service = await Service.findById(req.query.id);
  await db.disconnect();
  res.send(service);
});

handler.put(async (req, res) => {
  await db.connect();
  const service = await Service.findById(req.query.id);
  if (service) {
    service.name = req.body.name;
    service.slug = req.body.slug;
    service.price = req.body.price;
    service.serviceCategory = req.body.serviceCategory;
    service.image = req.body.image;
    service.countInStock = req.body.countInStock;
    service.description = req.body.description;
    await service.save();
    await db.disconnect();
    res.send({ message: 'Service Updated Successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Service Not Found' });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const service = await Service.findById(req.query.id);
  if (service) {
    await service.remove();
    await db.disconnect();
    res.send({ message: 'Service Deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Service Not Found' });
  }
});

export default handler;
