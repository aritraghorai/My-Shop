import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import UserType from "../../../Utils/Types/userType";
import { userStateType } from "../userAuthSlice";

export type orderDetailsStateType = {
  isLoading: boolean;
  users?: UserType[];
  error?: string;
};
export const initialOrderDetailState: orderDetailsStateType = {
  isLoading: false,
};

export const getAllUsers = createAsyncThunk<
  UserType[],
  void,
  { rejectValue: string | undefined }
>("GET api/users", async (_, thunkAPI) => {
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
      `${import.meta.env.VITE_URL}/api/user`,
      config
    );
    const order = data.users as UserType[];
    return order;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(err.response?.data.message);
  }
});

const getAllUsersSlice = createSlice({
  name: "orderSlice",
  initialState: initialOrderDetailState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<UserType[]>) => {
          state.isLoading = false;
          state.users = action.payload;
        }
      )
      .addCase(
        getAllUsers.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default getAllUsersSlice.reducer;
