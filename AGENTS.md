# Agent Instructions

These instructions apply to the whole repository.

## Priorities

1. Keep the site fast.
2. Keep the UI clean and easy to scan.
3. Keep code maintainable, typed, and structured.
4. Protect security and user data.
5. Preserve the portfolio's real content and intent.

## Project Context

- This is a Next.js portfolio site using TypeScript, Tailwind CSS, Radix UI, shadcn-style components, Framer Motion, Three.js, and pnpm.
- Prefer `pnpm` commands. Do not introduce another package manager or lockfile.
- Use existing folders and patterns before adding new architecture:
  - routes in `app/`
  - reusable UI primitives in `components/ui/`
  - portfolio sections in `components/component/`
  - feature-specific sections in matching component folders
  - shared helpers and data in `lib/`
  - static assets in `public/`

## UI/UX Guidance

- Build the actual portfolio experience first, not marketing filler or explanatory copy.
- Keep pages visually focused: clear hierarchy, restrained spacing, readable typography, and obvious navigation.
- Do not add decorative chrome that slows scanning. Avoid excessive cards, borders, shadows, gradients, and duplicated helper text.
- Make the first viewport communicate the page subject quickly: profile, projects, certificates, KAIST content, blog, or contact.
- Prefer real portfolio assets from `public/` over abstract placeholders.
- Keep responsive behavior intentional. Verify mobile and desktop layouts for text wrapping, overflow, and tap targets.
- Use existing UI primitives and icons where practical instead of custom one-off controls.
- Keep interactive states complete: hover, focus-visible, disabled, loading, empty, and error states when the workflow needs them.
- Do not let animations block reading, navigation, or first render. Motion should be subtle and purposeful.

## Code Structure

- Keep components small enough to understand. Extract repeated UI or logic only when it removes real duplication.
- Prefer typed data structures over ad hoc string parsing.
- Keep content changes close to the source of truth, usually `lib/data.ts` or the relevant page/component.
- Avoid broad refactors unless they are required for the requested change.
- Use clear names for components, props, helpers, and route files.
- Do not leave dead code, unused imports, console noise, or temporary debugging UI.

## Performance

- Optimize for fast initial render and low JavaScript cost.
- Prefer server components when client interactivity is not required.
- Add `"use client"` only for components that need browser APIs, state, effects, animation hooks, or event handlers.
- Keep heavy visual libraries, Three.js scenes, and motion isolated from static content.
- Use Next image behavior where suitable, stable dimensions for media, and avoid layout shift.
- Avoid unnecessary data fetching, large client bundles, and repeated computation in render paths.

## Security

- Never commit secrets, tokens, refresh tokens, `.env` files, or generated credentials.
- Keep upload and API routes defensive: validate input, constrain file types and sizes, and return minimal error details.
- Do not expose server-only environment variables to the client.
- Treat third-party API responses as untrusted and validate before use.
- Avoid adding dependencies unless they are necessary and maintained.

## Validation

- Before finishing meaningful code changes, run the narrowest useful check:
  - `pnpm lint` for lintable source changes
  - `pnpm build` for route, metadata, or production behavior changes
- If a check cannot run, report the reason clearly.
- For visible UI changes, inspect the affected page in a browser when practical.

## Git Hygiene

- Work from the current branch unless the user asks to switch.
- Do not revert user changes.
- Keep commits focused when asked to commit.
- Do not rewrite history or run destructive git commands without explicit approval.
