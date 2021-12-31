import nc from 'next-connect';
import OrderNoLogin from '../../../models/OrderNoLogin';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isAuth } from '../../../utils/auth';

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const orderNoLogins = await OrderNoLogin.find();
  res.send(orderNoLogins);
});

export default handler;
