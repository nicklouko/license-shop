import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';

interface Order {
  id: string;
  productId: string;
  status: string;
  total: number;
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
    <div>
      {orders.map((o) => (
        <div key={o.id}>
          <p>{o.productId}</p>
          <p>{o.status}</p>
          <p>{(o.total / 100).toFixed(2)}$</p>
        </div>
      ))}
    </div>
  );
}
