import express from 'express';
import {
  authUser,
  getAllUsers,
  getUserProfile,
  registerUser,
  updateUser,
} from '../Controller/userController';
import { protect, checkAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
router
  .route('/')
  .post(registerUser)
  .put(protect, updateUser)
  .get(protect, checkAdmin, getAllUsers);
export default router;
