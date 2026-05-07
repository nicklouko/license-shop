import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export async function getProducts(req: Request, res: Response) {
  const products = await prisma.product.findMany();

  res.status(200).json({ products });
  return;
}

export async function getProduct(req: Request, res: Response) {
  const id = req.params.id as string;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  res.status(200).json({ product });
  return;
}

export async function createProduct(req: Request, res: Response) {
  const { name, description, price } = req.body;
  const newProduct = await prisma.product.create({ data: { name, description, price } });
  res.status(201).json({ newProduct });
}
