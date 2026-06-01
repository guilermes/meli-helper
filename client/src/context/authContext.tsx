// src/context/authContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  id?: number;
  nome?: string;
  email?: string;
  nomeLoja?: string;
  avatar?: string;
}

interface AuthContextType {
  isLogado: boolean;
  user: UserData | null;
  login: (userData?: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogado, setIsLogado] = useState<boolean>(() => {
    return localStorage.getItem('@MeliHelper:logged') === 'true';
  });

  const [user, setUser] = useState<UserData | null>(() => {
    const salvo = localStorage.getItem('@MeliHelper:user');
    return salvo ? JSON.parse(salvo) : null;
  });

  // 🌟 login agora aceita os dados do usuário vindos da resposta da API
  const login = (userData?: UserData) => {
    localStorage.setItem('@MeliHelper:logged', 'true');
    if (userData) {
      localStorage.setItem('@MeliHelper:user', JSON.stringify(userData));
      setUser(userData);
    }
    setIsLogado(true);
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:3000/logout', { credentials: 'include' });
    } catch (error) {
      console.error('Erro ao encerrar sessão no servidor:', error);
    } finally {
      localStorage.removeItem('@MeliHelper:logged');
      localStorage.removeItem('@MeliHelper:user');
      setIsLogado(false);
      setUser(null);
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ isLogado, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
}