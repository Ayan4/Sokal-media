import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../Api/apiClient";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }) => {
    const response = await apiClient.post("/auth/login", {
      email,
      password
    });
    localStorage.setItem(
      "user",
      JSON.stringify({ userId: response.data.user._id, isUserPresent: true })
    );
    return response.data.user;
  }
);

export const getUserData = createAsyncThunk(
  "/user/getUserData",
  async userId => {
    try {
      const response = await apiClient.get(`/users?userId=${userId}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("user");
});

export const authSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isUserPresent: false,
    isFetching: false,
    error: null,
    status: "idle"
  },
  reducers: {
    follow: (state, action) => {
      state.user.followings.push(action.payload);
    },
    unfollow: (state, action) => {
      state.user.followings.filter(item => item !== action.payload);
    }
    // logout: (state, action) => {
    //   state.user = {};
    //   state.isUserPresent = false;
    // }
  },
  extraReducers: {
    [loginUser.pending]: state => {
      state.isFetching = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.isFetching = false;
      state.isUserPresent = true;
      state.user = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      state.isFetching = false;
    },
    [getUserData.pending]: state => {
      state.isFetching = true;
    },
    [getUserData.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
      state.isUserPresent = true;
    }
  }
});

export const { follow, unfollow, setUserData } = authSlice.actions;
export default authSlice.reducer;
