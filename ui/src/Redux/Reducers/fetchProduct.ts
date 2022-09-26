import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import productType from '../../Types/productType';

export type productListStateType = {
  products: productType[];
  loading: boolean;
  error: string | undefined;
};
const intitialFetchState: productListStateType = {
  products: [],
  loading: false,
  error: undefined,
};

export const getProducts = createAsyncThunk('fetchProducts', async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/products`);
  return data.products;
});

const fetchProductsSlice = createSlice({
  name: 'fetchProduct',
  initialState: intitialFetchState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<productType[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.error = 'Network Error';
      });
  },
});

export default fetchProductsSlice;
