import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { setupApiInterceptors } from '../services/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Setup API interceptors after store is created
setupApiInterceptors(() => store.getState());

// Type for dispatch
export type AppDispatch = typeof store.dispatch;
// Type for state
export type RootState = ReturnType<typeof store.getState>;
