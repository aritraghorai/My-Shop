import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUser,
} from '../Controller/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/').post(registerUser).put(protect, updateUser);
export default router;
