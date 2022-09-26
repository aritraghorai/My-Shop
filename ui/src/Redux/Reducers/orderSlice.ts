import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import orderType from '../../Types/orderType';
import { tAddpayload } from './addToCardSlice';
import { userStateType } from './userAuthSlice';

export type typeOrder = {
  isLoading: boolean;
  success: boolean;
  order?: orderType;
  error?: string;
};
type orderBodyType = {
  orderItem: tAddpayload[];
  shippingAddress?: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  payementMethod?: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
};
export const initialOrderState: typeOrder = {
  isLoading: false,
  success: false,
};
export const placeOrder = createAsyncThunk(
  'api/order',
  async (orderBody: orderBodyType) => {
    const userState = JSON.parse(
      localStorage.getItem('USER_KEY') as string
    ) as userStateType;
    const token = userState != null ? (userState.token as string) : '';
    const config = {
      headers: {
        contentType: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_URL}/api/order`,
      {
        ...orderBody,
      },
      config
    );
    const order = data.order as orderType;
    return order;
  }
);
const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: initialOrderState,
  reducers: {
    resetOrder(state) {
      state.order = undefined;
      state.success = false;
      state.error = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        placeOrder.fulfilled,
        (state, action: PayloadAction<orderType>) => {
          state.order = { ...action.payload };
          state.isLoading = false;
          state.success = true;
        }
      );
  },
});

export default orderSlice.reducer;

export const { resetOrder } = orderSlice.actions;
