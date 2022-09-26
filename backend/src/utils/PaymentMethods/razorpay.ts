import { instance } from '../../index';

export const createOrderRazerPay = async (
  amount: Number,
  receipt: string,
  partial_payment: boolean = false,
  currency: string = 'INR'
) => {
  const res = await instance.orders.create({
    amount: parseInt(String(amount)),
    currency,
    receipt,
  });
  return res;
};
