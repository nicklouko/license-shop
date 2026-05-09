import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function ProductsDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { token } = useContext(AuthContext)!;
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product));
  }, []);

  async function handleBuy() {
    /*if (!token) {
      navigate('/login');
      return;
    }*/
    const res = await fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ productId: product!.id }),
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      setError(data.message);
      return;
    }
    navigate('/dashboard');
  }

  return (
    <div>
      {product && (
        <div>
          <p>{product.id}</p>
          <p>{product.name}</p>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button onClick={handleBuy}>Buy</button>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
