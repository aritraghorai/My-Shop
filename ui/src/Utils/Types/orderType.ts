import { tAddpayload } from "../../Redux/Reducers/addToCardSlice";
import shippingAdressType from "./shippingAdressType";

type orderType = {
  _id: string;
  user?: {
    id: string;
    name?: string;
    email?: string;
  };
  orderItem: tAddpayload[];
  shippingAddress?: shippingAdressType;
  payementMethod?: string;
  itemsPrice?: number;
  paymentResult?: {
    id: string;
    status?: string;
    updateTime?: string;
    email_address?: string;
    receipt?: string;
  };
  taxPrice?: number;
  shippingPrice?: number;
  totalPrice?: number;
  isPaid?: boolean;
  paidAt?: string;
  isDelivered?: boolean;
  createdAt: string;
  deliveredAt?: string;
};
export default orderType;
