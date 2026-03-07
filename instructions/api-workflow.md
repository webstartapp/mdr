# API Workflow Instructions

This project follows a **Swagger-first (OpenAPI 3.x)** development workflow. The absolute source of truth for all communication is the OpenAPI specification.

## 1. Single Point of Truth
- **Source**: `packages/api/openapi.yaml` (or `.json`) is the definitive definition of the API.
- **Strict Typing**: Never define entities (interfaces, types, classes) manually in `apps/gui` or `apps/backend` if they are part of the API.
- **Generation**: All API types, interfaces, and endpoint fetchers MUST be generated using **Orval**.

## 2. Orval Integration
- **Tool**: Orval is the mandated generator for this project.
- **Configuration**: Managed via `orval.config.ts` at the monorepo root.
- **Command**: Use `npm run generate:api` to synchronize the codebase with the OpenAPI specification.
- **Client**: Use the **Fetch API** for all requests. Axios is strictly forbidden.
- **Validation**: Orval MUST be configured to generate **Zod schemas** for all request and response bodies.

## 3. Workflow
1. **Define**: Update the OpenAPI specification in `packages/api/openapi.yaml`.
2. **Generate**: Run the Orval generator.
3. **Implement**: 
   - Backend: Use generated Zod schemas to validate `req.body` using the `validateBody` middleware.
   - Frontend: Use the generated fetcher functions in hooks.

## 4. Backend Express Route Binding
To maintain perfect type inference between the Orval-generated tuples and Express request handlers, the backend MUST use the `restAPICall` wrapper (defined in `@backend/service/restAPI`).

- **Usage**: Wrap all Express route handlers with `restAPICall('apiTarget', 'operationId', async (req, res) => { ... })`.
- **Typing**: This utility automatically extracts the correct `Body` type from the Orval tuple and strongly types `req.body` and `res.json()`. Focus on writing the logic without using `any` or manual type assertions.

## 5. Coupling
Frontend and backend are strictly coupled through these shared, generated types and schemas. Any drift from the specification or use of manual types for API data is considered a critical violation.
