import nc from 'next-connect';
import OrderNoLogin from '../../../../models/OrderNoLogin';
import db from '../../../../utils/db';
import onError from '../../../../utils/error';
import { isAuth } from '../../../../utils/auth';

const handler = nc({
  onError,
});
handler.use(isAuth);
handler.put(async (req, res) => {
  await db.connect();
  const orderNoLogin = await OrderNoLogin.findById(req.query.id);
  if (orderNoLogin) {
    orderNoLogin.isDelivered = true;
    orderNoLogin.deliveredAt = Date.now();
    const deliveredOrderNoLogin = await orderNoLogin.save();
    await db.disconnect();
    res.send({
      message: 'Request Quoted',
      orderNoLogin: deliveredOrderNoLogin,
    });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Request not found' });
  }
});

export default handler;
