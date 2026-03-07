# Database Workflow: Knex.js

This document outlines the standards for database interactions, migrations, and seed data using Knex.js.

## 1. Core Principles
- **No Raw Queries**: Always use the Knex query builder. Raw SQL is only allowed in exceptional cases with explicit justification.
- **Transactions**: Use transactions for any operation involving multiple related table updates.
- **Strict Typing**: Use generated types for database rows wherever possible.

## 2. Migrations
- **Management**: Migrations are strictly managed from the **monorepo root**.
- **Commands**: 
  - `npm run migration:make <name>`: Create a new migration.
  - `npm run migration:latest`: Run all pending migrations.
- **Incremental**: Never modify an existing migration file that has already been deployed. Always create a new one.
- **Language**: Migrations are written in **JavaScript** (`.js`) to ensure they run natively in all environments.
- **Root Config**: The root uses `knexfile.js` to control migration execution across the codebase.
- **Up/Down**: Every migration must have both an `up` and a `down` function.

## 3. Repositories / Services
- **Abstraction**: Logic in `(pro)` or `(user)` routes should not call Knex directly. Use a `Service` or `Repository` layer.
- **Mapping**: Data from the database must be mapped to API entities (using `mapToX` utilities) before being sent to the frontend.

## 4. Performance
- **Indexing**: Always add indexes to columns used in `WHERE` clauses or `JOIN` conditions.
- **Batching**: Use `batchInsert` for large datasets.
- **Cleanup**: Ensure connections are properly closed or pooled.

## 5. Persistence Logic
- Every major entity must have `created_at` and `updated_at` timestamps.
- Use Soft Deletes (`deleted_at`) for critical regulatory data to maintain an audit trail.
