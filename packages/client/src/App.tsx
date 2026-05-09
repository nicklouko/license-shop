import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import AuthProvider from './context/authContext';
import ProductPage from './pages/ProductsPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<div>Product Detail</div>} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
