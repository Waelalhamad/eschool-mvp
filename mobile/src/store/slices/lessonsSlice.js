import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { quizzesAPI } from '../../services/api';

export const submitQuiz = createAsyncThunk(
  'lessons/submitQuiz',
  async ({ lessonId, answers }, { rejectWithValue }) => {
    try {
      const result = await quizzesAPI.submitQuiz(lessonId, answers);
      return { lessonId, ...result };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit quiz');
    }
  }
);

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState: {
    currentLesson: null,
    quizResults: {},
    isSubmitting: false,
    error: null,
  },
  reducers: {
    setCurrentLesson: (state, action) => {
      state.currentLesson = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitQuiz.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.quizResults[action.payload.lessonId] = action.payload;
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentLesson, clearError } = lessonsSlice.actions;
export default lessonsSlice.reducer;
