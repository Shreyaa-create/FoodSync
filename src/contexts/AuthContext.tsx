import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type Role = 'vendor' | 'ngo';

interface AuthState {
  isAuthenticated: boolean;
  role: Role | null;
  userName: string | null;
}

interface AuthContextType extends AuthState {
  login: (role: Role, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    const stored = localStorage.getItem('foodsync_auth');
    if (stored) {
      try { return JSON.parse(stored); } catch { /* ignore */ }
    }
    return { isAuthenticated: false, role: null, userName: null };
  });

  useEffect(() => {
    localStorage.setItem('foodsync_auth', JSON.stringify(auth));
  }, [auth]);

  const login = (role: Role, name?: string) => {
    setAuth({
      isAuthenticated: true,
      role,
      userName: name || (role === 'vendor' ? 'Green Bistro' : 'City Food Bank'),
    });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, role: null, userName: null });
    localStorage.removeItem('foodsync_auth');
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
