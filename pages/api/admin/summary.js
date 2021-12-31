import nc from 'next-connect';
import Order from '../../../models/Order';
import OrderNoLogin from '../../../models/OrderNoLogin';
import Product from '../../../models/Product';
import Service from '../../../models/Service';

import User from '../../../models/User';
import { isAuth, isAdmin } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const ordersCount = await Order.countDocuments();
  const orderNoLoginsCount = await OrderNoLogin.countDocuments();
  const productsCount = await Product.countDocuments();
  const servicesCount = await Service.countDocuments();

  const usersCount = await User.countDocuments();
  const ordersPriceGroup = await Order.aggregate([
    {
      $group: {
        _id: null,
        sales: { $sum: '$totalPrice' },
      },
    },
  ]);
  const orderNoLoginsPriceGroup = await OrderNoLogin.aggregate([
    {
      $group: {
        _id: null,
        sales: { $sum: '$totalPrice' },
      },
    },
  ]);

  const ordersPrice =
    ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;
  const orderNoLoginsPrice =
    orderNoLoginsPriceGroup.length > 0 ? orderNoLoginsPriceGroup[0].sales : 0;
  const salesData = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        totalSales: { $sum: '$totalPrice' },
      },
    },
  ]);
  await db.disconnect();
  res.send({
    ordersCount,
    orderNoLoginsCount,
    productsCount,
    servicesCount,
    usersCount,
    ordersPrice,
    orderNoLoginsPrice,
    salesData,
  });
});

export default handler;
