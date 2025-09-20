import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { coursesAPI } from '../../services/api';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const courses = await coursesAPI.getUnlockedCourses();
      return courses;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch courses');
    }
  }
);

export const fetchCourseLessons = createAsyncThunk(
  'courses/fetchCourseLessons',
  async (courseId, { rejectWithValue }) => {
    try {
      const lessons = await coursesAPI.getCourseLessons(courseId);
      return { courseId, lessons };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch lessons');
    }
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    currentCourseLessons: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCourseLessons: (state) => {
      state.currentCourseLessons = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCourseLessons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseLessons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCourseLessons = action.payload.lessons;
      })
      .addCase(fetchCourseLessons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCourseLessons } = coursesSlice.actions;
export default coursesSlice.reducer;
