// src/client/src/context/AuthContext.tsx

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

interface AuthContextType {
  firstName: string | null;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  firstName: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("firstName");
    if (saved) setFirstName(saved);
  }, []);

  const login = (name: string) => {
    localStorage.setItem("firstName", name);
    setFirstName(name);
  };

  const logout = () => {
    localStorage.removeItem("firstName");
    localStorage.removeItem("userId");
    setFirstName(null);
  };

  return (
    <AuthContext.Provider value={{ firstName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
