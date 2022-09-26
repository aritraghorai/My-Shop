import { Request, Response } from 'express';
//*This is an wrapper function to catch error from asynccronus function
const catchAsync = (fn: any) => {
  return (req: Request, res: Response, next: any) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
