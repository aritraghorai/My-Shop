import mongoose from 'mongoose'
import { z } from 'zod'
import { ReviewValidator } from '../Reviews/review.type'

export const ProductValidator = z.object({
    user: z.instanceof(mongoose.Schema.Types.ObjectId),
    name: z.string(),
    image: z.string(),
    brand: z.string(),
    category: z.string(),
    description: z.string(),
    rating: z.number(),
    numReviews: z.number(),
    price: z.number(),
    reviews: z.array(ReviewValidator).optional(),
    countInStock: z.number()
})
export type ProductType = z.infer<typeof ProductValidator>
