import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios.js";

const initialState = {};

export const postAnswer = createAsyncThunk(
  "auth/postAnswer",
  async (patchData) => {
    try {
      const response = await API.patch(
        `/answer/post/${patchData[1]}`,
        patchData[0]
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAnswer = createAsyncThunk(
  "auth/deleteAnswer",
  async (ansData) => {
    try {
      const response = API.patch(`/answer/delete/${ansData[0]}`, ansData[1]);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const answerReducer = createSlice({
  name: "answer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postAnswer.pending, (state) => {
        console.log("pending postAnswer");
      })
      .addCase(postAnswer.fulfilled, (state, action) => {
        console.log("fulfilled postAnswer", action.payload);
        // state.questionsList = action.payload;
      })
      .addCase(postAnswer.rejected, (state, action) => {
        console.log("rejected postAnswer", action.payload);
      });

    builder
      .addCase(deleteAnswer.pending, (state) => {
        console.log("pending deleteAnswer");
      })
      .addCase(deleteAnswer.fulfilled, (state, action) => {
        console.log("fulfilled deleteAnswer");
        // state.questionsList = action.payload;
      })
      .addCase(deleteAnswer.rejected, (state, action) => {
        console.log("rejected deleteAnswer", action.payload);
      });
  },
});

export default answerReducer.reducer;
