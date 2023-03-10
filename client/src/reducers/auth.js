import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios.js";

const initialState = {
  userData: null,
};
  
export const LogIn = createAsyncThunk(
  "auth/LogIn",
  async (logInData, { rejectWithValue }) => {
    try {
      const response = await API.post(
        "/users/login",
        logInData
      );
      localStorage.setItem("profile", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);
export const SignUp = createAsyncThunk(
  "auth/SignUp",
  async (SignUpData, { rejectWithValue }) => {
    try {
      const response = await API.post(
        "/users/signup",
        SignUpData
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchUserData: (state) => {
      state.userData = JSON.parse(localStorage.getItem("profile"));
    },
    setUserNull: (state) => {
      state.userData = null;
    },
    logout: () => {
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    // Login Handling
    builder
      .addCase(LogIn.fulfilled, (state, action) => {
        state.userData = action.payload;
        console.log("fulfilled login");
      })
      .addCase(LogIn.rejected, (state, action) => {
        console.log("rejected login");
      })
      .addCase(LogIn.pending, (state, action) => {
        console.log("pending login");
      });
    // Sign Up Handling
    builder
      .addCase(SignUp.pending, (state) => {
        console.log("pending signup");
      })
      .addCase(SignUp.fulfilled, (state) => {
        console.log("fulfilled signup");
      })
      .addCase(SignUp.rejected, (state) => {
        console.log("rjected signup");
      });
  },
});

export default authReducer.reducer;
export const { fetchUserData, logout, setUserNull } = authReducer.actions;
