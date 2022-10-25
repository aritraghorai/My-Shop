import { Request } from 'express'
import UserType from './userType'

export interface TypedRequestBody<T> extends Request {
    body: T
}
export interface ExtentRequestType<B = undefined>
    extends Request {
    body: B
    user: UserType | undefined | null
}
