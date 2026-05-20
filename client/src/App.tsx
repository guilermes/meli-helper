// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/appRoutes';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      {/* 
        Esta div controla o esqueleto da página:
        - min-h-screen: Garante que o app ocupe no mínimo 100% da altura da tela.
        - flex e flex-col: Organiza os filhos (Navbar, Conteúdo, Footer) verticalmente.
      */}
      <div className="flex flex-col min-h-screen">
        
        {/* 1. Fica fixo no topo */}
        <NavBar />

        {/* 
          2. O miolo do seu App (as páginas) ganha a classe 'flex-grow'.
          Isso faz com que essa tag ocupe TODO o espaço em branco disponível na tela, 
          empurrando o Footer para o final de forma natural!
        */}
        <main className="flex-grow">
          <AppRoutes />
        </main>

        {/* 3. Graças ao mt-auto e ao flex-grow acima, ele fica sempre no rodapé */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}