import express, { Router } from 'express'
import {
    authUser,
    getAllUsers,
    getUserProfile,
    registerUser,
    updateUser,
    getUserDetailByUserId,
    updateUserByUserId
} from '../Controller/userController'
import {
    protect,
    checkAdmin
} from '../middleware/authMiddleware'
import validateRequest from '../middleware/middleWare'
import {
    LoginValidator,
    UpdateValidator,
    UserValidator
} from '../Models/User/user.type'

const router: Router = express.Router()

router.post(
    '/login',
    validateRequest({
        body: LoginValidator
    }),
    authUser
)
router.route('/profile').get(protect, getUserProfile)
router
    .route('/')
    .post(
        validateRequest({
            body: UserValidator
        }),
        registerUser
    )
    .put(
        protect,
        validateRequest({
            body: UserValidator
        }),
        registerUser,
        updateUser
    )
    .get(protect, checkAdmin, getAllUsers)
router
    .route('/:id')
    .get(protect, checkAdmin, getUserDetailByUserId)
    .post(
        protect,
        checkAdmin,
        validateRequest({ body: UpdateValidator }),
        updateUserByUserId
    )

export default router
