// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLogado: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Inicializa o estado checando o localStorage logo no primeiro carregamento
  const [isLogado, setIsLogado] = useState<boolean>(() => {
    return !!localStorage.getItem('@MeliHelper:token');
  });

  const login = (token: string) => {
    localStorage.setItem('@MeliHelper:token', token);
    setIsLogado(true); // 🌟 Isso vai disparar a atualização na NavBar na mesma hora!
  };

  const logout = () => {
    localStorage.removeItem('@MeliHelper:token');
    setIsLogado(false);
  };

  return (
    <AuthContext.Provider value={{ isLogado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para facilitar o uso nas páginas
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}