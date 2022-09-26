import catchAsync from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import TokenDataType from '../Types/TokenDataType';
import { TypedRequestuser } from '../Types/requestType';
import User from '../Models/userModel';

export const protect = catchAsync(
  async (req: TypedRequestuser<{}>, res: Response, next: NextFunction) => {
    let token;
    if (
      req.header('Authorization') &&
      req.header('Authorization').startsWith('Bearer ')
    ) {
      token = req.header('Authorization').split(' ')[1];
      try {
        const decode = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as TokenDataType;
        req.user = await User.findById(decode.id);
      } catch (error) {
        return next(error);
      }
    }
    if (!token) {
      return next(new AppError('Unauthorized Access', 401));
    }
    next();
  }
);
