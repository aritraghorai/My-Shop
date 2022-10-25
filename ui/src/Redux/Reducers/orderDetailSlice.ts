import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import orderType from "../../Utils/Types/orderType";
import { userStateType } from "./userAuthSlice";

export type orderDetailsStateType = {
  isLoading: boolean;
  order?: orderType;
  error?: string;
};
export const initialOrderDetailState: orderDetailsStateType = {
  isLoading: false,
};

export const getOrderDetail = createAsyncThunk<
  orderType,
  { id: string },
  { rejectValue: string | undefined }
>("api/order", async ({ id }, thunkAPI) => {
  const userState = JSON.parse(
    localStorage.getItem("USER_KEY") as string
  ) as userStateType;
  const token = userState != null ? (userState.token as string) : "";

  try {
    const config = {
      headers: {
        contentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${import.meta.env.VITE_URL}/api/order/${id}`,
      config
    );
    const order = data.order as orderType;
    return order;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data as string | undefined);
  }
});

export const checkOrderSuccess = createAsyncThunk<
  orderType,
  {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    order_id: string;
  },
  { rejectValue: string | undefined }
>(
  "api/order/:id/payment",
  async (
    { razorpay_payment_id, razorpay_order_id, razorpay_signature, order_id },
    thunkAPI
  ) => {
    try {
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
      const { data } = await axios.put(
        `${import.meta.env.VITE_URL}/api/order/${order_id}/pay`,
        {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        },
        config
      );
      const order = data.order as orderType;
      return order;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data as string | undefined
      );
    }
  }
);

const orderDetailSlice = createSlice({
  name: "orderSlice",
  initialState: initialOrderDetailState,
  reducers: {
    resetOrderDetail(state) {
      state.order = undefined;
      state.error = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOrderDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getOrderDetail.fulfilled,
        (state, action: PayloadAction<orderType>) => {
          state.order = { ...action.payload };
          state.isLoading = false;
          state.error = undefined;
        }
      )
      .addCase(
        getOrderDetail.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          if (!action.payload) {
            state.error = "Network Error";
          } else state.error = "Order Not Found";
          state.order = undefined;
        }
      )
      .addCase(checkOrderSuccess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        checkOrderSuccess.fulfilled,
        (state, action: PayloadAction<orderType>) => {
          state.order = { ...action.payload };
          state.isLoading = false;
          state.error = undefined;
        }
      )
      .addCase(checkOrderSuccess.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default orderDetailSlice.reducer;
export const { resetOrderDetail } = orderDetailSlice.actions;
