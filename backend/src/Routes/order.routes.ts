import express, { Router } from 'express'
import {
    addOrderItem,
    getAllForUser,
    getOrderById,
    updateOrderToPaid
} from '../Controller/orderController'
import { protect } from '../middleware/authMiddleware'
import validateRequest from '../middleware/middleWare'
import { OrderValudator } from '../Models/Order/order.type'

const router: Router = express.Router()

router
    .route('/')
    .post(
        protect,
        validateRequest({
            body: OrderValudator
        }),
        addOrderItem
    )
    .get(protect, getAllForUser)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
export default router
