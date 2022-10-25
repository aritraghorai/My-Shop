import { z } from 'zod'

export const UserValidator = z.object({
    name: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(5).max(15),
    isAdmin: z.boolean().default(false)
})
export type UserType = z.infer<typeof UserValidator>

export const LoginValidator = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(15)
})
export const UpdateValidator = z.object({
    email: z.string().email(),
    name: z.string().min(4),
    isAdmin: z.boolean().default(false)
})
