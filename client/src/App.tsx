
import { AppRoutes } from './routes/appRoutes';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './globals.css';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Footer />
    </>
  );
}