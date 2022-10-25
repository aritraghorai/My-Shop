import mongoose from 'mongoose'
import { z } from 'zod'

const OrderValudator = z.object({
    user: z
        .instanceof(mongoose.Schema.Types.ObjectId)
        .optional(),
    orderItem: z
        .array(
            z.object({
                name: z.string(),
                countInStock: z.number(),
                qty: z.number(),
                image: z.string(),
                price: z.number(),
                product: z.string()
            })
        )
        .nonempty({ message: "Order can't Be Empty" }),
    shippingAddress: z.object({
        address: z.string(),
        city: z.string(),
        postalCode: z.string(),
        country: z.string()
    }),
    payementMethod: z.string(),
    itemsPrice: z.number(),
    taxPrice: z.number(),
    shippingPrice: z.number(),
    paymentResult: z.number().optional(),
    totalPrice: z.number(),
    isPaid: z.boolean().optional(),
    paidAt: z.string().optional(),
    isDelivered: z.boolean().optional(),
    deliveredAt: z.string().optional()
})
type OrderType = z.infer<typeof OrderValudator>
export { OrderValudator, OrderType }
