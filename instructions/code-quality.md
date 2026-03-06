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
- **Rule**: Avoid `any`. Use properly defined interfaces and types, avoid surpassing types with `in` or `as`.
- **Rule**: Non-TS files required by secondary systems (e.g., Knex migrations in `.js`) must be explicitly excluded from the main TypeScript build to maintain environmental consistency.

## Environment Variables
- **Rule**: No fallback values allowed for environment variables (e.g., `process.env.API_URL || 'http://localhost'`).
- **Enforcement**: Code must throw an error immediately during startup if a required environment variable is missing.


## Import Aliases
- **Rule**: ALL relative imports are strictly forbidden (`./` and `../`).
- **Standard**: 
  - Use `@/` for codebase-local imports (mapped to `src/`).
  - Use explicit root aliases like `@/App` or `@/index` for files outside `src/`.
  - Use `@api/` for shared API models and services.
- **Enforcement**: ESLint `no-restricted-imports` is active project-wide.

## Logging Standards
- **Rule**: Always use the `LoggerService` for application logging.
- **Rule**: Direct `console` calls (e.g., `console.log`, `console.error`) are forbidden.
- **Exception**: Legitimate fallback logging when the `LoggerService` itself fails or is unavailable.
- **Enforcement**: Use `// eslint-disable-next-line no-console` only for these specific fallback scenarios.

## User Interaction
- **Rule**: Native `Alert.alert()` and `window.confirm()` are **strictly forbidden**.
- **Alternative**: Use the global `Toast` component for notifications and the `BottomDock` confirmation tray for interactive decisions.
- **Rationale**: Native alerts break the professional flow and cannot be styled to match the advisor's clean, medical-grade UI.

## Function Style
- **Rule**: All functions MUST use arrow function expression syntax (`const myFunc = () => { ... }`).
- **Rationale**: Ensures consistency across the codebase and aligns with modern React and JavaScript patterns.
- **Enforcement**: ESLint `func-style` is set to `expression`.

## Type Assertions
- **Rule**: Type assertions using `as` are strictly forbidden (e.g., `data as User`).
- **Standard**: 
  - Use **Mapping Utilities** (`mapToX`) for converting database types to API types.
  - Use explicit typing for object literals.
  - Never use `// eslint-disable-next-line @typescript-eslint/consistent-type-assertions`.
- **Enforcement**: ESLint `@typescript-eslint/consistent-type-assertions` is set to `never`.

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

