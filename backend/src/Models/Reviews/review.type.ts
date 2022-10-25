import { z } from 'zod'

export const ReviewValidator = z.object({
    name: z.string(),
    rating: z.number(),
    comment: z.string()
})
export type ReviewType = z.infer<typeof ReviewValidator>
