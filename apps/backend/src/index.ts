import knexConfig from '@backend/knexfile';
import { LoggerService } from '@backend/logger';
import { authenticate, validateBody, AuthRequest } from '@backend/middleware';
import { postAuthSigninBody } from '@gen/mdr.zod';
import { User } from '@gen/model';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import knex, { Knex } from 'knex';
import { z } from 'zod';

dotenv.config({ path: '../../.env' });

/**
 * Validates required environment variables.
 */
const validateEnv = (): void => {
  const secrets = ['JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET', 'DATABASE_URL'];
  for (const key of secrets) {
    if (!process.env[key]) {
      throw new Error(`Critical environment variable missing: ${key}`);
    }
  }
};

validateEnv();

const ACCESS_SECRET = String(process.env.JWT_ACCESS_SECRET);
const REFRESH_SECRET = String(process.env.JWT_REFRESH_SECRET);

/**
 * Database Row Definition.
 */
interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'user' | 'pro';
}

/**
 * Mapping Utility.
 */
const mapToUser = (row: UserRow): User => {
  return {
    firstName: row.first_name,
    lastName: row.last_name,
    role: row.role,
  };
};

const devConfig = knexConfig.development;
if (!devConfig) {
  throw new Error('Database configuration for development is missing.');
}

const db: Knex = knex(devConfig);
const app = express();

const port = Number(process.env.PORT) || 4041;

app.use(cors({
  origin: process.env.NEXT_PUBLIC_GUI_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

const generateTokens = (user: UserRow): { accessToken: string; refreshToken: string } => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    ACCESS_SECRET,
    { expiresIn: '30m' },
  );
  const refreshToken = jwt.sign(
    { id: user.id },
    REFRESH_SECRET,
    { expiresIn: '8h' },
  );
  return { accessToken, refreshToken };
};

app.post('/auth/signin', validateBody(postAuthSigninBody), async (req: Request, res: Response): Promise<void> => {
  const body = z.object({ email: z.string(), password: z.string() }).parse(req.body);
  const { email, password } = body;

  try {
    const user = await db<UserRow>('users').where({ email: String(email) }).first();
    if (!user || !bcrypt.compareSync(String(password), user.password_hash)) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const { accessToken, refreshToken } = generateTokens(user);
    res.json({
      user: mapToUser(user),
      accessToken,
      refreshToken,
    });
  } catch (error: unknown) {
    LoggerService.error('Sign-in failed', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/auth/myself', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const user = await db<UserRow>('users').where({ id: userId }).first();
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    res.json(mapToUser(user));
  } catch (error: unknown) {
    LoggerService.error('Myself fetch failed', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/auth/signout', (_req: Request, res: Response): void => {
  res.status(204).send();
});

app.listen(port, () => {
  LoggerService.log(`Backend listening at http://localhost:${port}`);
});
