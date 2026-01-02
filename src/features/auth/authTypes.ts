export interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    user: { id: string; email: string, role: string } | null;
    authChecked: boolean;
  }
  