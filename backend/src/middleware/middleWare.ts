import { NextFunction, Request, Response } from 'express'
import ValidatorType from '../Types/ValidatorTypes'
import catchAsync from '../utils/catchAsync'

function validateRequest(validator: ValidatorType) {
    return catchAsync(
        async (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            if (validator.body) {
                req.body = await validator.body.parseAsync(
                    req.body
                )
            }

            next()
        }
    )
}
export default validateRequest
