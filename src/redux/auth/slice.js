import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosApi } from "../../helpers/AxiosApi";
import initialStates from "./state";

// Login Api Admin;
export const loginApiAdmin = createAsyncThunk(
  "loginApiAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.post(`auth/login`, data);
      if (response) {
        sessionStorage.setItem("accessToken", response?.data?.data?.token);
        sessionStorage.setItem("profileComplete", `${response?.data?.data}`);
      }
      AxiosApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response?.data?.data?.token}`;
      toast.success(response?.data?.message);
      return response;
    } catch (error) {
      if (!error) {
        throw error.response;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminGetProfileData = createAsyncThunk(
  "adminGetProfileData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosApi.get("profile");
      return response?.data?.data;
    } catch (error) {
      if (!error) {
        throw error.response;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialStates,
  extraReducers: {
    // Login Api Admin;
    [loginApiAdmin.pending]: (state) => {
      state.loading = true;
    },
    [loginApiAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.loginStatus.data = action.payload;
      state.error = false;
    },
    [loginApiAdmin.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [adminGetProfileData.pending]: (state) => {
      state.loading = true;
    },
    [adminGetProfileData.fulfilled]: (state, action) => {
      state.loading = false;
      state.adminGetProfileDataStatus.data = action.payload;
      state.error = false;
    },
    [adminGetProfileData.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
  reducers: {
    setAuth: (state) => {
      state.loading = null;
      state.error = null;
    },
  },
});
export const { setAuth } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
