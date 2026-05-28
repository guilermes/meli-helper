import { Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/Login.tsx';
import Home from '../pages/Home.tsx';
import Config  from '../pages/Config.tsx';
import ProductCreate from '../pages/ProductCreate.tsx';
import ProductList from '../pages/ProductList.tsx';
import Signup from '../pages/Signup.tsx';
import About from '../pages/About.tsx';
import Dashboard from '../pages/Dashboard.tsx';


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/config" element={<Config />} />
      <Route path="/productCreate" element={<ProductCreate />} />
      <Route path="/anuncios" element={<ProductList />} />
      <Route path="/cadastro" element={<Signup />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* Rota de página não encontrada (404) - Opcional */}
      <Route path="*" element={<h1 className="text-white p-6">Página não encontrada</h1>} />
    </Routes>
  );
}