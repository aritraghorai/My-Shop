import express, { Request, Response } from 'express'
import Product from '../Models/Product/producd.model'
import AppError from '../utils/AppError'
import catchAsync from '../utils/catchAsync'

export const getAllProduct = catchAsync(
    async (req: Request, res: Response) => {
        const products = await Product.find({})
        res.status(200).json({
            status: true,
            products
        })
    }
)
/**
 * @route : GET api/products/:id
 * @desc : Return  Product by id
 * @access : Public
 */
export const getProductById = catchAsync(
    async (req: Request, res: Response, next: any) => {
        const product = await Product.findById(
            req.params.id
        )
        if (!product) {
            return next(
                new AppError('Product Not Found', 404)
            )
        }
        res.status(200).json({
            status: true,
            product
        })
    }
)
