//*For Controling Error
import AppError from '../utils/AppError';
import { Response, Request } from 'express';

const sentErrorDev = (err: AppError, res: Response) => {
  console.log(err.stack);
  res.status(err.statusCode).json({
    status: false,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const sentErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: false,
      message: err.msg,
    });
  } else
    res.status(500).json({
      status: false,
      message: 'Something Happen Very Wrong',
    });
};
//*This Method for handle cast errror
const handleCaseError = (err: any) => {
  const message = `Invalid ${err.kind}:${err.value}`;
  return new AppError(message, 400);
};
//*This Method for handle duplicate entry
const handleDuplicateFieldsDb = (err: any) => {
  const message = `Duplicate field value ${err.keyValue.name}`;
  return new AppError(message, 400);
};
//*This is for field validation error
const handleValidationError = (err: any) => {
  const errors = Object.values(err.errors).map((item: any) => {
    return item.message;
  });
  const message = `Invlid Inpur Data ${errors.join('.')}`;
  return new AppError(message, 400);
};
//*Invalid Jwt token error
const handleJWTTokenError = () =>
  new AppError('Invalid Token Please Login agaim', 401);
//*Handle Invalid Token error
const handleTokenExpireError = () =>
  new AppError('Token Has Been Invalid', 401);

//*Global Error Handler
const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: any
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'devolopment') {
    sentErrorDev(err, res);
  } else {
    //*Mongose find method object error
    //*reference:https://github.com/Automattic/mongoose/issues/5354

    let error = { ...err };
    if (err.name === 'CastError' || err.name === 'BSONTypeError') {
      error = handleCaseError(error);
    }
    if (err.code === 11000) {
      error = handleDuplicateFieldsDb(error);
    }
    if (err.name === 'ValidationError') {
      error = handleValidationError(error);
    }
    if (err.name === 'JsonWebTokenError') {
      error = handleJWTTokenError();
    }
    if (err.name === 'TokenExpiredError') error = handleTokenExpireError();
    sentErrorProd(error, res);
  }

  next();
};

export default globalErrorHandler;
