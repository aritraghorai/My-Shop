import express, { Router } from 'express'
import {
    getAllProduct,
    getProductById
} from '../Controller/productController'

const router: Router = express.Router()

router.route('/').get(getAllProduct)

router.route('/:id').get(getProductById)

export default router
