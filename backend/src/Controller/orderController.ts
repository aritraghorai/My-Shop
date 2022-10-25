/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../utils/catchAsync'
import { ExtentRequestType } from '../Types/requestType'
import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/AppError'
import crypto from 'crypto'

import { createOrderRazerPay } from '../utils/PaymentMethods/razorpay'
import Order, {
    OrderDocuments
} from '../Models/Order/order.model'
import { OrderType } from '../Models/Order/order.type'

/**
 * @route : POST api/orders
 * @desc : Create new Order
 * @access : Private
 */
export const addOrderItem = catchAsync(
    async (
        req: ExtentRequestType<OrderType>,
        res: Response
    ) => {
        const userId = req.user?._id
        const { id, receipt } = (await createOrderRazerPay(
            req.body.totalPrice * 100,
            'fjdsjmsl'
        )) as {
            id: string
            amount_due: number
            receipt: string
        }
        const order = new Order({
            ...req.body,
            paymentResult: {
                id,
                receipt
            },
            user: userId
        })
        const createdOrder = await order.save()
        res.status(201).json({
            status: true,
            order: createdOrder
        })
    }
)
/**
 * @route : Get api/orders/:id
 * @desc : Get Order by Id
 * @access : Private
 */
export const getOrderById = catchAsync(
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const getOrder = await Order.findById(
            req.params.id
        ).populate('user', 'name email')
        if (!getOrder) {
            return next(
                next(new AppError('Order Not Fount', 404))
            )
        }
        res.status(200).json({
            status: true,
            order: getOrder
        })
    }
)
/**
 * @route : Get api/orders/:id/pay
 * @desc : Update Order To Paid
 * @access : Private
 */
export const updateOrderToPaid = catchAsync(
    async (
        req: ExtentRequestType<{
            razorpay_order_id: string
            razorpay_payment_id: string
            razorpay_signature: string
        }>,
        res: Response,
        next: NextFunction
    ) => {
        const getOrder = await Order.findById(req.params.id)
        if (!getOrder) {
            return next(
                next(new AppError('Order Not Fount', 404))
            )
        }
        const generateSignature = crypto
            .createHmac(
                'SHA256',
                process.env.RAZOR_PAY_KEY_SECRET as string
            )
            .update(
                req.body.razorpay_order_id +
                    '|' +
                    req.body.razorpay_payment_id
            )
            .digest('hex')
        if (
            generateSignature !==
            req.body.razorpay_signature
        ) {
            return next(new AppError('Payment Failed', 400))
        }
        getOrder.isPaid = true
        getOrder.paidAt = Date.now().toString()
        const updateOrder = await getOrder.save()
        res.status(200).json({
            status: true,
            order: updateOrder
        })
    }
)
/**
 * @route : Get api/orders/
 * @desc :Get All the Order Corosponds to login user
 * @access : Private
 */
export const getAllForUser = catchAsync(
    async (req: ExtentRequestType, res: Response) => {
        const getOrder = await Order.find({
            user: req.user?._id
        })
        res.status(200).json({
            status: true,
            Orders: getOrder
        })
    }
)
