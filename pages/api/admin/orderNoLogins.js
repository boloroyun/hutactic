import nc from 'next-connect';
import OrderNoLogin from '../../../models/OrderNoLogin';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});

handler.get(async (req, res) => {
  await db.connect();
  const orderNoLogins = await OrderNoLogin.find({});
  await db.disconnect();
  res.send(orderNoLogins);
});

export default handler;
