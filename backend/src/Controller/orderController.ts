import catchAsync from '../utils/catchAsync';
import { TypedRequestBody, TypedRequestuser } from '../Types/requestType';
import { Request, Response, NextFunction } from 'express';
import Order, { typeOrder } from '../Models/orderModel';
import AppError from '../utils/AppError';
import mongoose from 'mongoose';
import crypto from 'crypto';

import { createOrderRazerPay } from '../utils/PaymentMethods/razorpay';

type OrderBody = {
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
    postalCode: Number;
    country: string;
  };
  payementMethod: string;
  paymentResult?: Number;
  itemsPrice: Number;
  taxPrice: number;
  shippingPrice: Number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
};
/**
 * @route : POST api/orders
 * @desc : Create new Order
 * @access : Private
 */
export const addOrderItem = catchAsync(
  async (
    req: TypedRequestuser<OrderBody>,
    res: Response,
    next: NextFunction
  ) => {
    // console.log(req.body.shippingAddress);
    // console.log(req.user);
    const {
      orderItem,
      shippingAddress,
      totalPrice,
      taxPrice,
      shippingPrice,
      payementMethod,
      itemsPrice,
    } = req.body;
    if (!orderItem || orderItem.length < 1) {
      return next(new AppError('No Order Found', 401));
    }
    const userId = req.user?._id;

    // console.log(req.body);

    const { id, receipt } = (await createOrderRazerPay(
      req.body.totalPrice * 100,
      'fjdsjmsl'
    )) as { id: string; amount_due: number; receipt: string };
    const order = new Order({
      orderItem,
      shippingAddress,
      shippingPrice,
      totalPrice,
      taxPrice,
      paymentResult: {
        id,
        receipt,
      },
      payementMethod,
      user: userId,
      itemsPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json({
      status: true,
      order: createdOrder,
    });
  }
);
/**
 * @route : Get api/orders/:id
 * @desc : Get Order by Id
 * @access : Private
 */
export const getOrderById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const getOrder = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );
    if (!getOrder) {
      return next(next(new AppError('Order Not Fount', 404)));
    }
    res.status(200).json({
      status: true,
      order: getOrder,
    });
  }
);
/**
 * @route : Get api/orders/:id/pay
 * @desc : Update Order To Paid
 * @access : Private
 */
export const updateOrderToPaid = catchAsync(
  async (
    req: TypedRequestBody<{
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }>,
    res: Response,
    next: NextFunction
  ) => {
    const getOrder = await Order.findById(req.params.id);
    if (!getOrder) {
      return next(next(new AppError('Order Not Fount', 404)));
    }
    let generateSignature = crypto
      .createHmac('SHA256', process.env.RAZOR_PAY_KEY_SECRET as string)
      .update(req.body.razorpay_order_id + '|' + req.body.razorpay_payment_id)
      .digest('hex');
    if (generateSignature !== req.body.razorpay_signature) {
      return next(new AppError('Payment Failed', 400));
    }
    getOrder.isPaid = true;
    getOrder.paidAt = Date.now();
    const updateOrder = await getOrder.save();
    res.status(200).json({
      status: true,
      order: updateOrder,
    });
  }
);
/**
 * @route : Get api/orders/
 * @desc :Get All the Order Corosponds to login user
 * @access : Private
 */
export const getAllForUser = catchAsync(
  async (req: TypedRequestuser<{}>, res: Response, next: NextFunction) => {
    const getOrder = await Order.find({ user: req.user?._id });
    res.status(200).json({
      status: true,
      Orders: getOrder,
    });
  }
);
