import { Router } from 'express';
import { getProduct, getProducts, createProduct } from '../controllers/product.controller';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);

export default router;
