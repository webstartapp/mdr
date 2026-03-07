import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Knex } from 'knex';

import { SignInBody, User, SigninResponse } from '@/gen/mdr.schemas';

/**
 * Database Row Definition.
 */
export interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'user' | 'pro';
}

/**
 * Interface for the MDR Service.
 */
export interface IMdrService {
  signin(body: SignInBody): Promise<SigninResponse | null>;
  getMyself(userId: string): Promise<User | null>;
}

/**
 * Concrete implementation of IMdrService using Knex.
 */
export class MdrService implements IMdrService {
  private readonly ACCESS_SECRET: string;
  private readonly REFRESH_SECRET: string;

  constructor(private readonly db: Knex) {
    this.ACCESS_SECRET = String(process.env.JWT_ACCESS_SECRET);
    this.REFRESH_SECRET = String(process.env.JWT_REFRESH_SECRET);
  }

  private mapToUser(row: UserRow): User {
    return {
      firstName: row.first_name,
      lastName: row.last_name,
      role: row.role,
    };
  }

  private generateTokens(user: UserRow): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      this.ACCESS_SECRET,
      { expiresIn: '30m' },
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      this.REFRESH_SECRET,
      { expiresIn: '8h' },
    );
    return { accessToken, refreshToken };
  }

  async signin(body: SignInBody): Promise<SigninResponse | null> {
    const { email, password } = body;
    const user = await this.db<UserRow>('users').where({ email: String(email) }).first();
    
    if (!user || !bcrypt.compareSync(String(password), user.password_hash)) {
      return null;
    }

    const { accessToken, refreshToken } = this.generateTokens(user);
    return {
      user: this.mapToUser(user),
      accessToken,
      refreshToken,
    };
  }

  async getMyself(userId: string): Promise<User | null> {
    const user = await this.db<UserRow>('users').where({ id: userId }).first();
    if (!user) {
      return null;
    }
    return this.mapToUser(user);
  }
}
