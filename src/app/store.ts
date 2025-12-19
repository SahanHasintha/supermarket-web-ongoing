import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Type for dispatch
export type AppDispatch = typeof store.dispatch;
// Type for state
export type RootState = ReturnType<typeof store.getState>;
