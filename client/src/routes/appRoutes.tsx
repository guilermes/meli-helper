import { Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/Login.tsx';
import Home from '../pages/Home.tsx';
import Config from '../pages/Config.tsx';
import ProductCreate from '../pages/ProductCreate.tsx';
import ProductList from '../pages/ProductList.tsx';
import Signup from '../pages/Signup.tsx';
import About from '../pages/About.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import Profile from '../pages/Profile.tsx';

export function AppRoutes() {
  return (
    <Routes>
      {/* Institucional e Autenticação */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<Signup />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/config" element={<Config />} />
      <Route path="/perfil" element={<Profile />} />

      {/* Painel de Métricas / Cubagem (Acessível via /dashboard) */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Gerenciamento de Anúncios */}
      <Route path="/anuncios" element={<ProductList />} />
      
      {/* Rota para bater com o botão da Dashboard */}
      <Route path="/anuncios/novo" element={<ProductCreate />} />
      
      {/* Rota de página não encontrada (404) */}
      <Route path="*" element={<h1 className="text-white p-6">Página não encontrada</h1>} />
    </Routes>
  );
}