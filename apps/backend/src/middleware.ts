import { LoggerService } from '@backend/logger';
import { postAuthSigninBody } from '@gen/mdr.zod';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const ACCESS_SECRET = String(process.env.JWT_ACCESS_SECRET);

interface TokenPayload {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'pro';
}

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

const getTokenPayload = (decoded: unknown): TokenPayload | null => {
  const schema = z.object({
    id: z.string(),
    email: z.string(),
    role: z.enum(['admin', 'user', 'pro']),
  });

  const parsed = schema.safeParse(decoded);
  return parsed.success ? parsed.data : null;
};

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    const payload = getTokenPayload(decoded);
    if (payload) {
      req.user = payload;
      next();
    } else {
      res.status(401).json({ error: 'Invalid token payload' });
    }
  } catch (error: unknown) {
    LoggerService.error('Auth check failed', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

/**
 * Zod Validation Middleware
 */
export const validateBody = (schema: typeof postAuthSigninBody) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Invalid request data', details: result.error.format() });
    return;
  }
  req.body = result.data;
  next();
};
