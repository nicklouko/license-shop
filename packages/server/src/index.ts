import express from 'express';
import { License } from '@license-shop/shared';
import authRouter from './routes/auth.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/test', (req, res) => {
  const license: License = {
    id: '1',
    key: 'ABC-123',
    productName: 'Pro Plan',
    price: 99,
    expiresAt: null,
    userId: '123',
  };
  res.json(license);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
