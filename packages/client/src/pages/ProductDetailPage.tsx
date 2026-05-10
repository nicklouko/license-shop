import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import ProductDetailCard from '../components/productDetailCard';
import { API_URL } from '../lib/config';
import Loading from '../layouts/Loading';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product))
      .finally(() => setLoading(false));
  }, []);

  async function handleBuy() {
    if (!token) {
      navigate('/login');
      return;
    }
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
  if (loading) return <Loading />;

  return (
    <ProductDetailCard>
      {product && (
        <div className="flex flex-col gap-8 ">
          <h2 className="font-bold text-3xl">{product.name}</h2>

          <p className="text-gray-500 ">{product.description}</p>

          <button
            className="bg-blue-500 border border-blue-900  rounded-4xl flex justify-center gap-1 font-semibold text-lg hover:cursor-pointer hover:bg-blue-600 transition-colors duration-200"
            onClick={handleBuy}
          >
            Buy <p className="italic">({(product.price / 100).toFixed(2)}$)</p>
          </button>
        </div>
      )}
      {error && <p>{error}</p>}
    </ProductDetailCard>
  );
}
