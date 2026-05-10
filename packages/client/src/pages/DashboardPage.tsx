import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import ListingLayout from '../layouts/ListingPages';
import { API_URL } from '../lib/config';
import Loading from '../layouts/Loading';
import type { Order } from '@license-shop/shared';

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { token } = useContext(AuthContext)!;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/orders/me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <ListingLayout title="Orders" error={error}>
      {orders.map((o) => (
        <div
          className="flex flex-col justify-between h-40  border border-b-purple-500 rounded-2xl p-4 shadow-xs shadow-purple-500"
          key={o.id}
        >
          <div>
            <p className="font-semibold">{o.product!.name}</p>
            <p className="italic text-gray-500">Order Id: {o.id}</p>
            {o.license && <p className="font-mono text-sm">Key: {o.license.key}</p>}
          </div>
          <div className="flex">
            <p
              className={`max-w-20 w-full border rounded-4xl text-sm flex justify-center ${
                o.status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : o.status === 'pending'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-700'
              }`}
            >
              {o.status}
            </p>
            <p className="ml-auto italic">{(o.total / 100).toFixed(2)}$</p>
          </div>
        </div>
      ))}
    </ListingLayout>
  );
}
