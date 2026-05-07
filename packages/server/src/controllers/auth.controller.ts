import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    res.status(400).json({ message: 'Email already in use' });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashedPassword } });
  const { password: _, ...userWithoutPassword } = user;
  res.status(201).json({ user: userWithoutPassword });
  return;
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(401).json({ message: 'Invalid Credentials.' });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).json({ message: 'Invalid Credentials.' });
    return;
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '7d',
  });
  res.status(200).json({ token });
  return;
}
