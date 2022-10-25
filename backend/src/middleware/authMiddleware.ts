import catchAsync from '../utils/catchAsync'
import { Response, NextFunction } from 'express'
import AppError from '../utils/AppError'
import jwt from 'jsonwebtoken'
import TokenDataType from '../Types/TokenDataType'
import { ExtentRequestType } from '../Types/requestType'
import User from '../Models/User/user.model'

/**
 * @route : ALl private routes
 * @desc : Check Wether user is login or not
 * @access : private
 */
export const protect = catchAsync(
    async (
        req: ExtentRequestType,
        res: Response,
        next: NextFunction
    ) => {
        let token
        if (
            req.header('Authorization') &&
            req
                .header('Authorization')
                ?.startsWith('Bearer ')
        ) {
            token = req
                .header('Authorization')
                ?.split(' ')[1]
            try {
                if (token) {
                    const decode = jwt.verify(
                        token,
                        process.env.JWT_SECRET as string
                    ) as TokenDataType
                    req.user = await User.findById(
                        decode.id
                    )
                }
            } catch (error) {
                return next(error)
            }
        }
        if (!token) {
            return next(
                new AppError('Unauthorized Access', 401)
            )
        }
        next()
    }
)
/**
 * @route : ALl private routes
 * @desc : Check Wether user is admin or not
 * @access : private
 */
export const checkAdmin = catchAsync(
    async (
        req: ExtentRequestType,
        _res: Response,
        next: NextFunction
    ) => {
        if (!req.user?.isAdmin) {
            return next(
                new AppError('Not Authorized as admin', 401)
            )
        }
        next()
    }
)
