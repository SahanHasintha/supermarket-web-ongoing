import axios from 'axios';
import { refreshToken } from '../features/auth/authThunks';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true, // refresh cookie
});

// Function to set up the interceptor after store is created
export const setupApiInterceptors = (getState: () => any, dispatch: any) => {
  api.interceptors.request.use((config: any) => {
    const token = getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (originalRequest.url?.includes('/auth/refresh')) {
        return Promise.reject(error);
      }

      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const result = await dispatch(refreshToken());

          if (refreshToken.fulfilled.match(result)) {
            const newAccessToken = result.payload;

            originalRequest.headers.Authorization =
              `Bearer ${newAccessToken}`;

            return api(originalRequest);
          }
        } catch (err) {
          return Promise.reject(err);
        }
      }
  
      return Promise.reject(error);
    }
  );
};

export default api;
