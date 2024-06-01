import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));
// Get userStatus from local storage
const userStatus = localStorage.getItem("userStatus");

const initialState = {
  user: user ? user : null,
  userStatus: userStatus ? userStatus : "idle",
  message: "",
};

//Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Login User

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.userStatus = "idle";
        localStorage.setItem("userStatus", "loading");
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userStatus = "succeeded";
        localStorage.setItem("userStatus", "succeeded");
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.userStatus = "failed";
        localStorage.setItem("userStatus", "failed");
        state.message = action.payload;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(login.pending, (state) => {
        state.userStatus = "loading";
        localStorage.setItem("userStatus", "loading");
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userStatus = "succeeded";
        localStorage.setItem("userStatus", "succeeded");
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.userStatus = "failed";
        localStorage.setItem("userStatus", "failed");
        state.message = action.payload;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(logout.fulfilled, (state) => {
        state.userStatus = "idle";
        localStorage.setItem("userStatus", "idle");
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
