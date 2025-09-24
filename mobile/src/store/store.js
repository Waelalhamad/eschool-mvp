import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import coursesSlice from './slices/coursesSlice';
import lessonsSlice from './slices/lessonsSlice';
import couponsSlice from './slices/couponsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    courses: coursesSlice,
    lessons: lessonsSlice,
    coupons: couponsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});