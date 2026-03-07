import knexConfig from '@backend/knexfile';
import { LoggerService } from '@backend/logger';
import { registerMdrRoutes } from '@backend/routes/mdr.wrapper';
import { MdrService } from '@backend/service/mdr.service';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import knex, { Knex } from 'knex';

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

const devConfig = knexConfig.development;
if (!devConfig) {
  throw new Error('Database configuration for development is missing.');
}

const db: Knex = knex(devConfig);
const mdrService = new MdrService(db);

const app = express();
const port = Number(process.env.PORT) || 4041;

app.use(cors({
  origin: process.env.NEXT_PUBLIC_GUI_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Register Orval-synced routes
registerMdrRoutes(app, mdrService);

app.listen(port, () => {
  LoggerService.log(`Backend listening at http://localhost:${port}`);
});
