import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios.js";

const initialState = {
  questionsList: null,
};
export const getAllQuestions = createAsyncThunk(
  "auth/getAllQuestions",
  async () => {
    try {
      const response = await API.get("/question/get");
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const postQuestion = createAsyncThunk(
  "auth/postQuestion",
  async (postQuestionData, { rejectWithValue }) => {
    try {
      const response = await API.post("/question/ask", postQuestionData);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const deleteQuestion = createAsyncThunk(
  "auth/deleteQuestion",
  async (id) => {
    try {
      const response = API.delete(`/question/delete/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const updateVote = createAsyncThunk(
  "auth/updateVote",
  async (voteData) => {
    try {
      const response = await API.put(
        `/question/vote/${voteData[0]}`,
        voteData[1]
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
const questionReducer = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postQuestion.pending, (state) => {
        console.log("pending postque");
      })
      .addCase(postQuestion.fulfilled, (state, action) => {
        console.log("fulfilled postque", action.payload);
      })
      .addCase(postQuestion.rejected, (state, action) => {
        console.log("rejected postque", action.payload);
      });
    builder
      .addCase(getAllQuestions.pending, (state) => {
        console.log("pending getAllQuestions");
      })
      .addCase(getAllQuestions.fulfilled, (state, action) => {
        console.log("fulfilled getAllQuestions", action.payload);
        state.questionsList = action.payload;
      })
      .addCase(getAllQuestions.rejected, (state, action) => {
        console.log("rejected getAllQuestions", action.payload);
      });
    builder
      .addCase(deleteQuestion.pending, (state) => {
        console.log("pending deleteQuestion");
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        console.log("fulfilled deleteQuestion", action.payload);
        // state.questionsList = action.payload;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        console.log("rejected deleteQuestion", action.payload);
      });
    builder
      .addCase(updateVote.pending, (state) => {
        console.log("pending updateVote");
      })
      .addCase(updateVote.fulfilled, (state, action) => {
        console.log("fulfilled updateVote", action.payload);
        // state.questionsList = action.payload;
      })
      .addCase(updateVote.rejected, (state, action) => {
        console.log("rejected updateVote", action.payload);
      });
  },
});

export default questionReducer.reducer;
