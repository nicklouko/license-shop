import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import AuthProvider from './context/authContext';
import ProductPage from './pages/ProductsPage';
import ProductsDetailPage from './pages/ProductDetailPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductsDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
