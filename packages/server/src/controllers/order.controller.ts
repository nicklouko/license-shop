import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../lib/prisma';

export async function createOrder(req: AuthRequest, res: Response) {
  const { productId } = req.body;
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  const order = await prisma.order.create({
    data: { userId, productId, total: product.price, status: 'pending' },
  });

  res.status(201).json({ order });
}

export async function getMyOrders(req: AuthRequest, res: Response) {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { product: { select: { name: true } } },
  });
  res.status(200).json({ orders });
}
