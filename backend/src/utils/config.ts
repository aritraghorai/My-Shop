import dotEnv from 'dotenv'
import path from 'path'

dotEnv.config({
    path: path.resolve(__dirname, '../../config.env')
})

const PORT = process.env.PORT
const MONGOOSE_URL = process.env.MONGOOSE_URL
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID
const RAZOR_PAY_KEY_SECRET =
    process.env.RAZOR_PAY_KEY_SECRET
export {
    PORT,
    MONGOOSE_URL,
    RAZORPAY_KEY_ID,
    RAZOR_PAY_KEY_SECRET
}
