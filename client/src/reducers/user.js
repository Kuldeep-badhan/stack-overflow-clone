import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios.js";

const initialState = {
  users: null,
};

export const getAllUsers = createAsyncThunk("auth/getAllUsers", async () => {
  try {
    const response = await API.get("/users/getAllUsers");
    return response.data;
  } catch (error) {
    return error;
  }
});
export const getUser = createAsyncThunk("auth/getUser", async (id) => {
  try {
    const response = await API.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
export const postUserData = createAsyncThunk("auth/postUserData", async (userIdAndData) => {
  try {
    const response = await API.patch(`/users/update/${userIdAndData[0]}`, userIdAndData[1]);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
export const deleteUser = createAsyncThunk("auth/deleteUser", async (id) => {
  try {
    const response = await API.delete(`/users/delete/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        console.log("pending getAllUsers");
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        console.log("fulfilled getAllUsers", action.payload);
        state.users = action.payload;
        // state.questionsList = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        console.log("rejected getAllUsers", action.payload);
      });
    builder
      .addCase(getUser.pending, (state) => {
        console.log("pending getUser");
      })
      .addCase(getUser.fulfilled, (state, action) => {
        console.log("fulfilled getUser", action.payload);
        // state.questionsList = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log("rejected getUser", action.payload);
      });
    builder
      .addCase(postUserData.pending, (state) => {
        console.log("pending postUserData");
      })
      .addCase(postUserData.fulfilled, (state, action) => {
        console.log("fulfilled postUserData", action.payload);
        // state.questionsList = action.payload;
      })
      .addCase(postUserData.rejected, (state, action) => {
        console.log("rejected postUserData", action.payload);
      });
    builder
      .addCase(deleteUser.pending, (state) => {
        console.log("pending deleteUser");
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        console.log("fulfilled deleteUser", action.payload);
        // state.questionsList = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        console.log("rejected deleteUser", action.payload);
      });
  },
});

export default userReducer.reducer;
// export const {fetchUserData, setUser} = userReducer.actions;
