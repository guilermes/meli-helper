import { Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/Login.tsx';
import Home from '../pages/Home.tsx';


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Rota de página não encontrada (404) - Opcional */}
      <Route path="*" element={<h1 className="text-white p-6">Página não encontrada</h1>} />
    </Routes>
  );
}