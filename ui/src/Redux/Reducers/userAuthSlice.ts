/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import UserType from "../../Utils/Types/userType";

export type userStateType = {
  loading: boolean;
  user?: UserType;
  token?: string;
  error?: string;
};
const loginInitialState: userStateType = {
  loading: false,
};

export const updateUser = createAsyncThunk(
  "update_user",
  async (loginData: {
    currPassword: string;
    name?: string;
    email?: string;
    password?: string;
  }) => {
    const { currPassword, name, email, password } = loginData;
    const body: { name?: string; email?: string; password?: string } = {};
    const userState = JSON.parse(
      localStorage.getItem("USER_KEY") as string
    ) as userStateType;
    //?Update User Data Function

    const token = userState != null ? (userState.token as string) : "";
    if (name) {
      body.name = name;
    }
    if (email) {
      body.email = email;
    }
    if (password) {
      body.password = password;
    }
    console.log(token);
    const config = {
      headers: {
        contentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_URL}/api/user`,
        {
          ...body,
          currPassword,
        },
        config
      );
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
//?Login User Action Function
export const login = createAsyncThunk(
  "login_user",
  async (loginData: { email: string; password: string }) => {
    const { email, password } = loginData;
    const config = {
      headers: { contentType: "application/json" },
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/api/user/login`,
        {
          email,
          password,
        },
        config
      );

      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
//?Register User Action Function
export const registerUser = createAsyncThunk(
  "register_user",
  async (loginData: { email: string; password: string; name: string }) => {
    const { name, email, password } = loginData;
    const config = {
      headers: { contentType: "application/json" },
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/api/user`,
        { name, email, password },
        config
      );
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export const userAuthSlice = createSlice({
  name: "user_login",
  initialState: loginInitialState,
  reducers: {
    logoutUser(state) {
      state.user = undefined;
      state.token = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(
      login.fulfilled,
      (
        state,
        action: PayloadAction<{
          status: boolean;
          user: UserType;
          token: string;
          message: string;
        }>
      ) => {
        if (!action.payload.status) {
          state.error = action.payload.message;
          state.loading = false;
        } else {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.error = undefined;
        }
      }
    );
    //?Register user
    builder.addCase(registerUser.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(
      registerUser.fulfilled,
      (
        state,
        action: PayloadAction<{
          user: UserType;
          token: string;
          status: boolean;
          message: string;
        }>
      ) => {
        if (action.payload.status) {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.error = undefined;
        } else {
          state.error = action.payload.message;
          state.loading = false;
        }
      }
    );

    //?Update User
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateUser.fulfilled,
      (
        state,
        action: PayloadAction<{
          user: UserType;
          token: string;
          status: boolean;
          message: string;
        }>
      ) => {
        if (action.payload.status) {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.error = undefined;
        } else {
          state.error = action.payload.message;
          state.loading = false;
        }
      }
    );
    builder.addCase(updateUser.rejected, (state, action: any) => {
      state.loading = false;
      state.user = loginInitialState.user;
      state.error = JSON.stringify(action.error.response.data);
    });
  },
});

export const { logoutUser } = userAuthSlice.actions;
