import AppError from '../utils/AppError'
import catchAsync from '../utils/catchAsync'
import { Response, NextFunction } from 'express'
import {
    ExtentRequestType,
    TypedRequestBody
} from '../Types/requestType'
import User from '../Models/User/user.model'
import generateToken from '../utils/generateToken'

/**
 * @route : POST api/user/login
 * @desc : Auth user get Token
 * @access : Public
 */
export const authUser = catchAsync(
    async (
        req: TypedRequestBody<{
            email: string
            password: string
        }>,
        res: Response,
        next: NextFunction
    ) => {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user && (await user.matchPassword(password))) {
            return res.status(200).json({
                status: true,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                },
                token: generateToken(user._id)
            })
        }
        return next(
            new AppError('Invalid Email and Password', 400)
        )
    }
)
/**
 * @route : GET api/user/profile
 * @desc : Get User Profile
 * @access : private
 */
export const getUserProfile = catchAsync(
    async (
        req: ExtentRequestType,
        res: Response,
        next: NextFunction
    ) => {
        const user = await User.findById(req.user?._id)
        if (user) {
            res.status(200).json({
                status: true,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                }
            })
        } else {
            return next(new AppError('User Not Found', 404))
        }
    }
)
/**
 * @route : POST api/user
 * @desc : Create a new user
 * @access : public
 */
export const registerUser = catchAsync(
    async (
        req: TypedRequestBody<{
            name: string
            email: string
            password: string
        }>,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const { name, email, password } = req.body
        const userExist = await User.findOne({
            email: email
        })
        if (userExist) {
            return next(
                new AppError('User already exists', 400)
            )
        }
        const user = await User.create({
            name,
            email,
            password
        })
        if (user) {
            res.status(201).json({
                status: true,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                },
                token: generateToken(user._id)
            })
        } else {
            return next(
                new AppError('Invalid User Data', 400)
            )
        }
    }
)
/**
 * @route : PUT api/user
 * @desc : update user data
 * @access : private
 */
export const updateUser = catchAsync(
    async (
        req: ExtentRequestType<{
            name: string
            email: string
            password: string
            currPassword: string
        }>,
        res: Response,
        next: NextFunction
    ) => {
        const { name, email, password, currPassword } =
            req.body
        const user = await User.findById(req.user?._id)
        if (!user) {
            return next(
                new AppError('User does not exists', 400)
            )
        }
        if (
            !currPassword ||
            !(await user.matchPassword(currPassword))
        ) {
            return next(new AppError('Wrong password', 401))
        }

        if (password) {
            user.password = password
        }
        if (name) {
            user.name = name
        }
        if (email) {
            user.email = email
        }
        const updateUser = await user.save()
        if (updateUser) {
            res.status(200).json({
                status: true,
                user: {
                    _id: updateUser._id,
                    name: updateUser.name,
                    email: updateUser.email,
                    isAdmin: updateUser.isAdmin
                },
                token: generateToken(updateUser._id)
            })
        } else {
            return next(new AppError('User Not Found', 404))
        }
    }
)
/**
 * @route : PUT api/user/:id
 * @desc : update user data
 * @access : private only for admin
 */
export const updateUserByUserId = catchAsync(
    async (
        req: ExtentRequestType<{
            name: string
            email: string
        }>,
        res: Response,
        next: NextFunction
    ) => {
        const id = req.params.id
        const updateUser = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
        if (updateUser) {
            res.status(200).json({
                status: true,
                user: {
                    _id: updateUser._id,
                    name: updateUser.name,
                    email: updateUser.email,
                    isAdmin: updateUser.isAdmin
                }
            })
        } else {
            return next(new AppError('User Not Found', 404))
        }
    }
)

/**
 * @route : GET api/user
 * @desc : Get All Users only for admins
 * @access : private
 */
export const getAllUsers = catchAsync(
    async (_req: ExtentRequestType, res: Response) => {
        const users = await User.find({}).select(
            '-password'
        )
        // console.log(users);
        res.status(200).json({
            status: 'OK',
            users
        })
    }
)

/**
 * @route : GET api/user/:id
 * @desc : Get User by Id for admins
 * @access : private
 */
export const getUserDetailByUserId = catchAsync(
    async (req: ExtentRequestType, res: Response) => {
        const id = req.params.id
        const user = await User.findById(id).select(
            '-password'
        )
        // console.log(users);
        res.status(200).json({
            status: 'OK',
            user
        })
    }
)
