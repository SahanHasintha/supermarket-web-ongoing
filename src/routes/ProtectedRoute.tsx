import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshToken } from '../features/auth/authThunks';

export default function ProtectedRoute() {
  const dispatch = useDispatch();
  const isAuth = useAppSelector(state => state.auth.isAuthenticated);
  const authChecked = useAppSelector(state => state.auth.authChecked);
  const loading = useAppSelector(state => state.auth.loading);

  useEffect(() => {
    if (!authChecked) {
      dispatch(refreshToken() as any);
    }
  }, [dispatch, authChecked]);

  if (!authChecked || loading) {
    return <div>Checking authentication...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
