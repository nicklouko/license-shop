import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { createOrder, getMyOrders } from '../controllers/order.controller';

const router = Router();

router.use(authenticate);

router.post('/', createOrder);
router.get('/me', getMyOrders);

export default router;
