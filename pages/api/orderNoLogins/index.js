import nc from 'next-connect';
import OrderNoLogin from '../../../models/OrderNoLogin';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});

handler.post(async (req, res) => {
  await db.connect();
  const newOrderNoLogin = new OrderNoLogin({
    ...req.body,
  });
  const orderNoLogin = await newOrderNoLogin.save();
  res.status(201).send(orderNoLogin);
});

export default handler;
