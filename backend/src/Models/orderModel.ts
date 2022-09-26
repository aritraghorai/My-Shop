import mongoose, { Schema } from 'mongoose';

export type typeOrder = {
  user: mongoose.Schema.Types.ObjectId;
  orderItem: [
    {
      name: string;
      countInStock: Number;
      qty: Number;
      image: string;
      price: number;
      product: mongoose.Schema.Types.ObjectId;
    }
  ];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  payementMethod: string;
  paymentResult?: {
    id: string;
    status?: string;
    updateTime?: string;
    email_address?: string;
    receipt?: string;
  };
  itemsPrice: Number;
  taxPrice: number;
  shippingPrice: Number;
  totalPrice: Number;
  isPaid: boolean;
  paidAt: Number;
  isDelivered: boolean;
  deliveredAt: Date;
};
interface typeOrderDocument extends Document, typeOrder {}
const orderSchema: Schema<typeOrderDocument> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItem: [
      {
        name: {
          type: String,
          required: true,
        },
        countInStock: {
          type: Number,
          required: true,
        },
        qty: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    payementMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: {
        type: String,
      },
      status: String,
      updateTime: String,
      email_address: String,
      receipt: String,
    },
    itemsPrice: {
      type: Number,
      required: true,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
