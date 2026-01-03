import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';

export default function ProtectedRoute() {
  const isAuth = useAppSelector(state => state.auth.isAuthenticated);
  const user = useAppSelector(state => state.auth.user);
  const authChecked = useAppSelector(state => state.auth.authChecked);
  const loading = useAppSelector(state => state.auth.loading);

  if (!authChecked || loading) {
    return <div>Checking authentication...</div>;
  }

  if (!isAuth || user?.role !== 'ADMIN') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
