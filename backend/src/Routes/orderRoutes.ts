import express from 'express';
import {
  addOrderItem,
  getAllForUser,
  getOrderById,
  updateOrderToPaid,
} from '../Controller/orderController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(protect, addOrderItem).get(protect, getAllForUser);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
export default router;
