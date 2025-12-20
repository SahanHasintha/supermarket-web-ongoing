import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const isAuth = useAppSelector(state => state.auth.isAuthenticated);
  return isAuth ? children : <Navigate to="/login" replace />;
}
