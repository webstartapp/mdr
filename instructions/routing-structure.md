# Next.js Routing Structure

This project uses Next.js Route Groups to manage access control and layout variation for different user tiers.

## 1. Route Groups
The `app/` directory is organized into the following groups:

### `(public)`
- **Access**: Everyone.
- **Content**: Landing page, about MDR, general regulation news, login/signup.
- **Layout**: Simple, conversion-focused.

### `(user)`
- **Access**: Logged-in users only.
- **Content**: User profile, basic MDR advisor, saved projects, dashboard.
- **Middleware**: Must verify JWT or session before granting access.
- **Layout**: Sidebar-driven management interface.

### `(pro)`
- **Access**: Logged-in users with a valid "Pro" status (verified via GP Webpay).
- **Content**: Advanced QMS tools, full legislative database, Technical File templates, AI deep-dives.
- **Middleware**: Must verify `user.isPro === true`. Redirect to `/upgrade` if not Pro.

### `(admin)`
- **Access**: Administrative accounts only.
- **Content**: Content management, user oversight, payment logs.
- **Gemma Integration**: Admin can edit and generate content pages using the Gemma AI integration.

## 2. Transitions
- Moving between groups should be seamless but may involve different root layouts.
- Shared components (e.g., Breadcrumbs, UserMenu) should be kept in `@/components/shared`.
