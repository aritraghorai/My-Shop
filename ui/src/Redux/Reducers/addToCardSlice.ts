import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import productType from '../../Types/productType';
import shippingAdressType from '../../Types/shippingAdressType';

export interface tAddpayload {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
  countInStock: number;
}
export type cardStateType = {
  cardItems: tAddpayload[];
  shippingAddress?: shippingAdressType;
  payementMethod?: string;
};
const initialCardState: cardStateType = {
  cardItems: [],
};

export const addToCardAction = createAsyncThunk(
  'addToCard',
  async ({ id, qty }: { id: string; qty: number }) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_URL}/api/products/${id}`
    );
    const product = data.product as productType;
    return {
      product: product._id,
      qty,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
    };
  }
);

const addToCardSlice = createSlice({
  name: 'addToCard',
  initialState: initialCardState,
  reducers: {
    removeFromCard: (state, action: PayloadAction<string>) => {
      state.cardItems = state.cardItems.filter(
        (c) => c.product !== action.payload
      );
    },
    addShippingAddress: (state, action: PayloadAction<shippingAdressType>) => {
      state.shippingAddress = action.payload;
    },
    addPaymentMode: (state, action: PayloadAction<string>) => {
      state.payementMethod = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      addToCardAction.fulfilled,
      (state, action: PayloadAction<tAddpayload>) => {
        const item = action.payload;
        const exitingItem = state.cardItems.find(
          (x) => x.product === item.product
        );
        if (exitingItem) {
          state.cardItems = state.cardItems.map((x) =>
            x.product == item.product ? item : x
          );
        } else {
          state.cardItems = [...state.cardItems, item];
        }
      }
    );
  },
});

export default addToCardSlice;
export const { addShippingAddress, removeFromCard, addPaymentMode } =
  addToCardSlice.actions;
