import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import productType from "../../Utils/Types/productType";

export type productListStateType = {
  products: productType[];
  isLoading: boolean;
  error: string | undefined;
};
const intitialFetchState: productListStateType = {
  products: [],
  isLoading: false,
  error: undefined,
};

export const getAllProductAction = createAsyncThunk<
  productType[],
  undefined,
  { rejectValue: string | undefined }
>("fetchProducts", async (_, thunkApi) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_URL}/api/products`
    );
    return data.products;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkApi.rejectWithValue(err.response?.data.message);
  }
});

const fetchProductsSlice = createSlice({
  name: "fetchProduct",
  initialState: intitialFetchState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllProductAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllProductAction.fulfilled,
        (state, action: PayloadAction<productType[]>) => {
          state.isLoading = false;
          state.products = action.payload;
        }
      )
      .addCase(
        getAllProductAction.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ? action.payload : "Network Error";
        }
      );
  },
});

export default fetchProductsSlice;
