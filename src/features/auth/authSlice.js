import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async () => {
  console.log("this ran");
  const response = await axios.get(
    "https://sokal-media.herokuapp.com/api/auth/login"
  );
  return response.data.user;
});

const initialState = {
  user: null,
  isFetching: false,
  error: false,
  status: "idle"
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: state => {
      state.isFetching = true;
      state.error = false;
    },
    [login.fulfilled]: (state, action) => {
      state.status = "success";
      state.isFetching = false;
      state.error = false;
      state.user = action.payload;
    },
    [login.rejected]: state => {
      state.status = "failed";
      state.error = true;
      state.isFetching = false;
    }
  }
});

export const {} = authSlice.actions;
export default authSlice.reducer;
