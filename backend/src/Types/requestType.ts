import { Request } from 'express';
import UserType from './userType';

export interface TypedRequestBody<T> extends Request {
  body: T;
}
export interface TypedRequestuser<T> extends Request {
  body: T;
  user: UserType | undefined | null;
}
