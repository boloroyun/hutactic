import mongoose from 'mongoose';

const orderNoLoginSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    orderNoLoginItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        category: { type: String, required: true },
        brand: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    shippingAddressNoLogin: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: {
        type: Number,
        required: true,
      },

      address: { type: String, required: false },
      city: { type: String, required: false },
      postalCode: { type: String, required: true },
      country: { type: String, required: false },
      location: {
        lat: String,
        lng: String,
        address: String,
        name: String,
        vicinity: String,
        googleAddressId: String,
      },
      projectInformation: { type: String },
      image: { type: String },
    },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const OrderNoLogin =
  mongoose.models.OrderNoLogin ||
  mongoose.model('OrderNoLogin', orderNoLoginSchema);
export default OrderNoLogin;
