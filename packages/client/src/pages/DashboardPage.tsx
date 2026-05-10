import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import ListingLayout from '../layouts/ListingPages';

interface Order {
  id: string;
  productId: string;
  status: string;
  total: number;
  product: { name: string };
}
export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { token } = useContext(AuthContext)!;

  useEffect(() => {
    fetch('http://localhost:3000/orders/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders));
  }, []);

  return (
    <ListingLayout title="Orders">
      {orders.map((o) => (
        <div
          className="flex flex-col justify-between h-38  border border-b-purple-500 rounded-2xl p-4 shadow-xs shadow-purple-500"
          key={o.id}
        >
          <div>
            <p className="font-semibold">{o.product.name}</p>
            <p className="italic text-gray-500">Order Id: {o.id}</p>
          </div>
          <div className="flex">
            <p className="max-w-20 w-full border rounded-4xl  text-sm flex justify-center bg-amber-400 text-gray-500">
              {o.status}
            </p>
            <p className="ml-auto italic">{(o.total / 100).toFixed(2)}$</p>
          </div>
        </div>
      ))}
    </ListingLayout>
  );
}
