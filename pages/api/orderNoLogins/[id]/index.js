import nc from 'next-connect';
import OrderNoLogin from '../../../../models/OrderNoLogin';
import db from '../../../../utils/db';

const handler = nc();
handler.get(async (req, res) => {
  await db.connect();
  const orderNoLogin = await OrderNoLogin.findById(req.query.id);
  await db.disconnect();
  res.send(orderNoLogin);
});

export default handler;
