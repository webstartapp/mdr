'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var dotenv = require('dotenv');
dotenv.config({ path: './.env' });
var config = {
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations',
      extension: 'js',
    },
    seeds: {
      directory: './seeds',
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
      directory: './migrations',
      extension: 'js',
    },
  },
};
exports.default = config;
