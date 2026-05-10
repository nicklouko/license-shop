import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../lib/prisma';
import crypto from 'crypto';

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

  const licenseKey = crypto.randomBytes(16).toString('hex').toUpperCase();
  const license = await prisma.license.create({
    data: { key: licenseKey, productId, orderId: order.id },
  });

  await prisma.order.update({ where: { id: order.id }, data: { status: 'completed' } });

  res.status(201).json({ order, licenseKey: license.key });
}

export async function getMyOrders(req: AuthRequest, res: Response) {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { product: { select: { name: true } }, license: true },
  });
  res.status(200).json({ orders });
}
