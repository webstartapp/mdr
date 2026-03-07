# Echoes of Left Behind - Development Instructions

Welcome to the Echoes of Left Behind project! This file serves as the entry point for understanding the project's structure and development workflows.

## Project Structure
- `apps/gui`: Expo (React Native) mobile application.
- `apps/backend`: Nuxt.js (Vue) backend API.
- `packages/api`: Shared API definitions and generated code (Orval).
- `instructions/`: Detailed documentation for story, code quality, and monetization.

## Key Workflows
1. **API First**: Always update `packages/api/openapi.yaml` before changing API implementations. Run `npm run generate` in the `packages/api` folder to update types.
2. **Monetization**: Follow the rules in [monetization.md](./instructions/monetization.md).
3. **Story & Logic**: Follow the game mechanics described in [story.md](./instructions/story.md).
4. **Save Slots**: The game supports up to 5 save slots per user. Progress is synced per slot.
5. **Documentation**: App documentation (Privacy, Terms, etc.) is backend-driven and fetched via API.

## Technology Stack
- **Frontend**: Expo, React Native, Axios (generated).
- **Backend**: Nuxt 4, Nitro.
- **Database**: Drizzle ORM, PostgreSQL.
- **Auth**: JWT (Bearer tokens).
- **API**: OpenAPI 3.1, Orval.
- **Environment**: Strict `.env` files enforced. **NO FALLBACKS ALLOWED.** The application must crash immediately if a required environment variable is missing.
- **Network**: Port **4021** (Backend), Port **4020** (GUI).
- **Linting**: Strict ESLint rules (max 150 lines per file, unused vars check, restricted relative imports).
- **Import Aliases**:
  - `@/` maps to `src/` for codebase-local imports.
  - `@/App` and `@/index` for root GUI files.
  - `@/gen/` for Orval-generated code.
  - **Relative imports (`./`, `../`) are strictly forbidden.**

## Getting Started
1. **Setup Environment**:
   - Create `apps/backend/.env` with `PORT=4021`, `DATABASE_URL`, `JWT_SECRET`, `GOOGLE_API_KEY`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET`.
   - Create `apps/gui/.env` with `EXPO_PUBLIC_API_URL=http://localhost:4021` and Google Client IDs.
2. **Install dependencies**: `npm install`
3. **Database Setup**: `npm run db:migrate` (runs generate + apply)
4. **Start Development**: `npm run dev` (starts both on dedicated ports)
5. **Generate API types**: `npm run generate:api`

### Mobile Platform Note
The GUI automatically detects Android emulators. If `EXPO_PUBLIC_API_URL` is set to `localhost`, it will transparently use `10.0.2.2` on Android while maintaining `localhost` for iOS and Web.
