import * as dotenv from 'dotenv';
import type { Knex } from 'knex';

dotenv.config({ path: '../../../.env' });

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: '../../../migrations',
      extension: 'js',
    },
    seeds: {
      directory: '../../../seeds',
    },
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: '../../../migrations',
      extension: 'js',
    },
  },

};

export default config;
