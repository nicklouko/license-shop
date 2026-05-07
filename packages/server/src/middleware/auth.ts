import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token Passed' });
    return;
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token Provided' });
    return;
  }

  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
      userId: string;
    };
    req.userId = decoded_token.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid Token' });
  }
}
