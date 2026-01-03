import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { AuthState } from './authTypes';

interface LoginResponse {
  accessToken: string;
  user: AuthState['user'];
}

export const login = createAsyncThunk<
  LoginResponse,
  { email: string; password: string }
>('auth/login', async (data) => {
  const res = await api.post<LoginResponse>('/auth/login', data);
  return res.data;
});

export const refreshToken = createAsyncThunk<LoginResponse>(
  'auth/refresh',
  async () => {
    const res = await api.post<LoginResponse>('/auth/refresh');
    return { accessToken: res.data.accessToken, user: res.data.user };
  }
);

export const logoutApi = createAsyncThunk(
  'auth/logout',
  async () => {
    await api.post('/auth/logout');
  }
);
