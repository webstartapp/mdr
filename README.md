# MDR Adviser

Professional Medical Device Regulation (MDR) Advisor platform.

## Setup Instructions

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mdr_db
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

### Database Setup

1. Ensure PostgreSQL is running and the database is created.
2. Run migrations:
   ```bash
   npm run migration:latest --workspace=@mdr/backend
   ```
3. (Optional) Seed the database:
   ```bash
   npm run seed:run --workspace=@mdr/backend
   ```

### Running the Application

- **Backend**: `npm run dev --workspace=@mdr/backend`
- **Frontend**: `npm run dev --workspace=@mdr/gui`

## Authentication

The project uses JWT for authentication:
- **Access Token**: Valid for 30 minutes.
- **Refresh Token**: Valid for 8 hours.
- Header: `Authorization: Bearer <access_token>`
