import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingLayout from '../layouts/ListingPages';
import { API_URL } from '../lib/config';
import Loading from '../layouts/Loading';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}
export default function ProductPage() {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setData(data.products))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <ListingLayout error={error} title="Products">
      {data.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-sky-700 shadow-xs p-3 max-w-xs w-full h-48 hover:scale-105 hover:shadow-md transition-all duration-200"
        >
          <Link className="flex flex-col justify-between h-full" to={`/products/${product.id}`}>
            <p className="text-xl font-bold ">{product.name}</p>
            <p className="text-gray-500 mt-2 min-h-12 line-clamp-2">{product.description}</p>
            <p className="mt-4 ml-auto">{(product.price / 100).toFixed(2)}$</p>
          </Link>
        </div>
      ))}
    </ListingLayout>
  );
}
