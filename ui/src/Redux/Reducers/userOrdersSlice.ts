import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import orderType from "../../Utils/Types/orderType";
import { userStateType } from "./userAuthSlice";

export type allOrderbyUserStateType = {
  isLoading: boolean;
  orders?: orderType[];
  error?: string;
};

export const initialOrderState: allOrderbyUserStateType = {
  isLoading: false,
};
export const fetchAllOrderAction = createAsyncThunk<
  orderType[],
  void,
  { rejectValue: string | undefined }
>("Get api/order", async (_, thunkAPI) => {
  const userState = JSON.parse(
    localStorage.getItem("USER_KEY") as string
  ) as userStateType;
  const token = userState != null ? (userState.token as string) : "";
  const config = {
    headers: {
      contentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_URL}/api/order`,
      config
    );
    const order = data.Orders as orderType[];
    return order;
  } catch (error) {
    const err = error as AxiosError<string>;
    return thunkAPI.rejectWithValue(err.response?.data as string | undefined);
  }
});
const fetchAllOrderSlice = createSlice({
  name: "orderSlice",
  initialState: initialOrderState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllOrderAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchAllOrderAction.fulfilled,
        (state, action: PayloadAction<orderType[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchAllOrderAction.rejected, (state) => {
        state.isLoading = false;
        state.orders = [];
      });
  },
});

export default fetchAllOrderSlice.reducer;
