import nc from 'next-connect';
import Service from '../../../models/Service';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const serviceCategories = await Service.find().distinct('serviceCategory');
  await db.disconnect();
  res.send(serviceCategories);
});

export default handler;
