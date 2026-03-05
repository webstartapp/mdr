# API Workflow Instructions

This project follows a Swagger-first (OpenAPI) development workflow, ensuring strictly typed communication between the Next.js frontend and the MDR logic backend.

## Source of Truth
- The file `packages/api/openapi.yaml` (or `.json`) is the absolute source of truth for all API communication.
- **Environment Variables**: API base URLs and secrets must be loaded from strict `.env` files without fallbacks.
- **NEVER** define entities (interfaces, types, classes) manually in `apps/gui` or `apps/backend` if they are part of the API.

## Type Generation
- All types, interfaces, and API calls must be generated from the Swagger specification.
- Use `npm run generate:api` to update the generated code after changing the Swagger file.
- Even if an entity is not directly used in an API call but is part of the domain model, it should be defined in the Swagger schema to ensure consistency across the monorepo.

## Coupling
- Frontend and backend are heavily coupled through shared types. 
- Any change to the API structure (e.g., adding a new regulation endpoint) must start with an update to the Swagger file.
