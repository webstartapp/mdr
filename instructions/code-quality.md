# Code Quality Instructions

These rules are enforced to keep the codebase maintainable and clean.

## File Size Limits
- **Rule**: No file should exceed **150 lines**.
- **Rationale**: Smaller files are easier to test, review, and understand. If a file grows too large, refactor it into smaller components or utility functions.

## Unused Code
- **Rule**: Unused variables and unused imports are strictly forbidden.
- **Enforcement**: ESLint will throw errors for any unused code. Fix these immediately by removing the unused references.

## Code Style
- **Rule**: No more than **one consecutive empty line** is allowed between code blocks.
- **Rationale**: Keeps the code tight and scannable.
- **Enforcement**: ESLint `no-multiple-empty-lines` rule.

## Type Safety
- **Rule**: Use Strict TypeScript everywhere.
- **Rule**: Avoid `any`. Use properly defined interfaces and types.
- **Rule**: Type assertions using `as` and custom type predicates using `is` (e.g., `val is Type`) are **strictly forbidden**.
- **Alternative**: Use **Zod schemas** for type narrowing and runtime validation.
- **Rule**: Non-TS files required by secondary systems (e.g., Knex migrations in `.js`) must be explicitly excluded from the main TypeScript build.

## Environment Variables
- **Rule**: No fallback values allowed for environment variables.
- **Enforcement**: Code must throw an error immediately during startup if a required environment variable is missing.

## Linting & Monorepo Infrastructure
- **Rule**: All linting is managed from the monorepo root using `eslint.config.mjs`.
- **Standard**: The project uses **ESLint 9**.
- **Type-Awareness**: The project uses `typescript-eslint`'s **Project Service** for 100% accurate type-aware linting across all packages.
- **Compliance**: Zero lint errors or warnings are tolerated. Any violation must be fixed immediately.

## Import Aliases
- **Rule**: ALL relative imports are strictly forbidden (`./` and `../`).
- **Standard**: 
  - Use `@/` for codebase-local imports (mapped to `src/`).
  - Use explicit root aliases like `@/App` or `@/index` for files outside `src/`.
  - Use `@api/` for shared API models and services.
  - Use `@backend/` for backend internal modules.
  - Use `@gen/` for Orval-generated code.
- **Enforcement**: ESLint `no-restricted-imports` is active project-wide.

## Logging Standards
- **Rule**: Always use the `LoggerService` for application logging.
- **Rule**: Direct `console` calls are forbidden.
- **Enforcement**: ESLint `no-console` rule.

## User Interaction
- **Rule**: Native `Alert.alert()` and `window.confirm()` are **strictly forbidden**.
- **Alternative**: Use the global `Toast` component for notifications.

## Function Style
- **Rule**: All functions MUST use arrow function expression syntax.
- **Enforcement**: ESLint `func-style` is set to `expression`.

## Mapping & Data Transformation
- **Rule**: Use **Mapping Utilities** (`mapToX`) for converting database or internal types to API entities to ensure leak-proof data exposure.

## Code Complexity
- **Rule**: Functions must have a cyclomatic complexity of no more than **10**.
- **Rationale**: Keeps logic simple and manageable. If a function is too complex, split it into smaller, specialized helper functions.
- **Enforcement**: ESLint `complexity` rule.

## Styling & CSS Architecture
- **Rule**: Prefer **CSS Modules** (`.module.css`) with Tailwind's `@apply` directive over direct inline Tailwind classes in JSX/TSX for all component-level styling.
- **Rule**: Direct Tailwind utility usage in JSX is permitted only for layout-level positioning (e.g., `flex`, `grid`, `padding` on a main container) or simple toggles.
- **Rule**: Always use **configured theme tokens** via `@apply`. Direct CSS properties (e.g., `color: #123456`) are forbidden within CSS files unless they reference a CSS variable defined in `@theme`.
- **Rule**: Maintain strict separation of concerns: JSX for structure/logic, CSS Modules for visual presentation.

## Tailwind CSS (v4+)
- **Rule**: Use the `@reference` directive in all CSS Modules to correctly resolve theme variables and utility classes.
- **Rule**: Standard Tailwind arbitrary values (e.g., `text-[#123456]`) are strictly forbidden. Extend the `@theme` in `globals.css` for any ad-hoc values.
- **Rule**: Use modern CSS media query syntax (e.g., `@media (width >= theme(--breakpoint-md))`) instead of deprecated `@screen` directives.

## Icon Component Pattern
- **Rule**: Use a `Record`-based mapping (`ICON_STYLES`) to bind variants to specific CSS classes for both the icon and its wrapper.
- **Rule**: Load icons statically from `lucide-react`. Dynamic loading is forbidden for core UI icons.
- **Rule**: The Icon component must NOT accept `size` or `className` props. All styling must be controlled via the `variant` prop to ensure project-wide consistency.

## Deployment & Build
- **Rule**: Localization (i18n) must be cookie-persistent (`NEXT_LOCALE`) and resolved server-side without URL slugs for a cleaner user experience.

