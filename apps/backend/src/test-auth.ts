import knexConfig from '@backend/knexfile';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import knex, { Knex } from 'knex';
import { z } from 'zod';

import { User } from '@/gen/mdr.schemas';

dotenv.config({ path: '../../.env' });

const devConfig = knexConfig.development;
if (!devConfig) {
  throw new Error('Database configuration for development is missing.');
}

const db: Knex = knex(devConfig);
const API_URL = 'http://localhost:4041';

interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'user' | 'pro';
}

const setupTestUser = async (): Promise<UserRow> => {
  const passwordHash = bcrypt.hashSync('password123', 10);
  await db('users').where({ email: 'test@example.com' }).del();
  
  const results = await db<UserRow>('users').insert({
    email: 'test@example.com',
    password_hash: passwordHash,
    first_name: 'Test',
    last_name: 'User',
    role: 'admin',
  }).returning('*');

  const user = results[0];
  if (!user) throw new Error('Failed to create test user');
  return user;
};

const testSignIn = async (): Promise<string> => {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'password123',
    }),
  });

  if (response.status === 200) {
    const data: unknown = await response.json();
    const parsed = z.object({ accessToken: z.string() }).parse(data);
    return parsed.accessToken;
  }
  throw new Error(`Sign In failed: ${response.status}`);
};

const testMyself = async (accessToken: string): Promise<void> => {
  const response = await fetch(`${API_URL}/auth/myself`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status === 200) {
    const data: unknown = await response.json();
    const userRes = z.custom<User>().parse(data);
    if (userRes.role === 'admin') {
      return;
    }
  }
  throw new Error(`Myself endpoint failed: ${response.status}`);
};

const testInvalidCredentials = async (): Promise<void> => {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'wrongpassword',
    }),
  });

  if (response.status === 401) {
    return;
  }
  throw new Error(`Invalid credentials test failed (expected 401, got ${response.status})`);
};

const runTests = async (): Promise<void> => {
  try {
    await setupTestUser();
    const accessToken = await testSignIn();
    await testMyself(accessToken);
    await testInvalidCredentials();
  } finally {
    await db.destroy();
  }
};

runTests().catch((_err: unknown) => {
  process.exit(1);
});
