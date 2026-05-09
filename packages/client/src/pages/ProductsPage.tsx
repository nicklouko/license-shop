import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}
export default function ProductPage() {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => setData(data.products))
      .catch((err) => setError(err));
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <ul>
        {data.map((product) => (
          <li key={product.id}>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{(product.price / 100).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
