import { createContext, useState } from 'react';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  function login(token: string) {
    localStorage.setItem('token', token);
    setToken(token);
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  // !!token = true if token is valid, false if null. Used liked this because isAuthenticated is boolean and token is of type string or null.
  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
