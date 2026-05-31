// src/context/authContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLogado: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // O estado visual inicial lê uma flag simples de controle do client
  const [isLogado, setIsLogado] = useState<boolean>(() => {
    return localStorage.getItem('@MeliHelper:logged') === 'true';
  });

  const login = () => {
    // Como o backend já setou o cookie HttpOnly na resposta, 
    // nós só ligamos a chave de visualização da interface
    localStorage.setItem('@MeliHelper:logged', 'true');
    setIsLogado(true);
  };

  const logout = async () => {
    try {
      // Avisa o backend para apagar o cookie
      await fetch("http://localhost:3000/logout", { credentials: 'include' });
    } catch (error) {
      console.error("Erro ao chamar a limpeza de sessão no servidor", error);
    } finally {
      // Limpa os estados do frontend de qualquer forma
      localStorage.removeItem('@MeliHelper:logged');
      setIsLogado(false);
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ isLogado, login, logout }}>
      { children }
    </AuthContext.Provider >
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
}