import Razorpay from 'razorpay'
import {
    RAZORPAY_KEY_ID,
    RAZOR_PAY_KEY_SECRET
} from '../config'

export const instance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZOR_PAY_KEY_SECRET
})
export const createOrderRazerPay = async (
    amount: number,
    receipt: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    partial_payment = false,
    currency = 'INR'
) => {
    const res = await instance.orders.create({
        amount: parseInt(String(amount)),
        currency,
        receipt
    })
    return res
}
