import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  getUserDetailById,
  updateUserById,
} from "../../../Services/Admin/users";
import updateUserBodyType from "../../../Utils/Types/UpdateUserBodyType";
import UserType from "../../../Utils/Types/userType";
import store from "../../store";
import { getAllUsers } from "./listAllUser";

export interface userDetailStateType {
  user?: UserType;
  error?: string;
  isLoading: boolean;
}
const initialState: userDetailStateType = {
  isLoading: false,
};
//*Fetch User By Id Async Action
export const getUserDetailByIdAction = createAsyncThunk<
  UserType,
  { id: string },
  { rejectValue: string | undefined }
>("GET api/user/:id", async ({ id }, thunkApi) => {
  try {
    const res = await getUserDetailById(id);
    return res.user as UserType;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkApi.rejectWithValue(err.response?.data.message as string);
  }
});
//Update User By  Id Action
export const updateUserByIdAction = createAsyncThunk<
  UserType,
  { id: string; body: updateUserBodyType },
  { rejectValue: string | undefined }
>("POST /api/user/:id", async ({ id, body }, thunkApi) => {
  try {
    const data = await updateUserById(id, body);
    return data.user as UserType;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return thunkApi.rejectWithValue(err.response?.data.message);
  }
});

const userDetailSlice = createSlice({
  name: "admin/UserDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetailByIdAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUserDetailByIdAction.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.user = action.payload;
          state.isLoading = false;
          state.error = undefined;
        }
      )
      .addCase(
        getUserDetailByIdAction.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.user = undefined;
        }
      );
    builder
      .addCase(updateUserByIdAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateUserByIdAction.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          store.dispatch(getAllUsers);
          state.user = action.payload;
          state.isLoading = false;
          state.error = undefined;
        }
      )
      .addCase(
        updateUserByIdAction.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.user = undefined;
        }
      );
  },
});

export default userDetailSlice.reducer;
