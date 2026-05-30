// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/appRoutes';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>

      <div className="flex flex-col min-h-screen">
      
        <NavBar />

        <main className="flex-grow">
          <AppRoutes />
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}