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

export const refreshToken = createAsyncThunk<string>(
  'auth/refresh',
  async () => {
    const res = await api.post<{ accessToken: string }>('/auth/refresh');
    return res.data.accessToken;
  }
);

export const logoutApi = createAsyncThunk(
  'auth/logout',
  async () => {
    await api.post('/auth/logout');
  }
);
