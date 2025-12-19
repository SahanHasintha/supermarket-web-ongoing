import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './authTypes';

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: any }>) {
      state.accessToken = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.error = null;
    },
    logout(state) {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
