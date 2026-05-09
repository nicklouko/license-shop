import express from 'express';
import { License } from '@license-shop/shared';
import authRouter from './routes/auth.routes';
import productRouter from './routes/product.routes';
import ordersRouter from './routes/order.routes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/orders', ordersRouter);

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
