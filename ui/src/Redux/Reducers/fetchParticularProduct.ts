import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import productType from '../../Types/productType';

export type productDetailStateType = {
  product: productType;
  loading: boolean;
  error: string | null;
};
const intitialProductDetailState: productDetailStateType = {
  product: {
    _id: '',
    name: '',
    image: '',
    description: '',
    brand: '',
    category: '',
    price: 2,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  loading: true,
  error: null,
};

export const getProductDetail = createAsyncThunk(
  'fetch/productdetil',
  async (productId: string) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_URL}/api/products/${productId}`
    );
    return data.product;
  }
);

const fetchProductDetailSlice = createSlice({
  name: 'fetchProductDetail',
  initialState: intitialProductDetailState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getProductDetail.fulfilled,
        (state, action: PayloadAction<productType>) => {
          state.loading = false;
          state.product = action.payload;
        }
      )
      .addCase(getProductDetail.rejected, (state) => {
        state.loading = false;
        state.error = 'Network Error';
      });
  },
});
export default fetchProductDetailSlice;
