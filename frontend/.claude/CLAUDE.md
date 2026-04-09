
You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Grill-Me Skill

ALWAYS use the grill-me skill: after proposing a solution or implementation, critically challenge your own approach. Ask yourself:
- What could go wrong with this approach?
- Are there edge cases I haven't considered?
- Is there a simpler or more idiomatic way to do this in Angular?
- Does this violate any of the best practices listed in this file?
- Will this scale well?

Only proceed with the implementation after you've grilled your own proposal and are confident it holds up.

## Git Commit Conventions

- Use **Conventional Commits** format: `<type>(<scope>): <short description>`
  - Types: `feat`, `fix`, `refactor`, `test`, `chore`, `docs`, `style`, `perf`, `ci`, `build`
  - Scope is optional but encouraged (e.g., `feat(auth): add login form`)
- In the commit body, include a summary of **why** the commit exists, not just what changed.
- Reference business cases, user stories, or issue numbers if they exist (e.g., `Closes #42`, `Relates to US-123`).
- Example:
  ```
  feat(dashboard): add monthly revenue chart

  Adds a bar chart component showing monthly revenue trends.
  This supports the executive dashboard initiative (US-205) which
  requires at-a-glance financial KPIs for stakeholders.
  ```

## Changelog

- After each commit, update `CHANGELOG.md` at the repository root following the [Keep a Changelog](https://keepachangelog.com/) standard.
- Group changes under: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.
- Keep an `[Unreleased]` section at the top for changes not yet in a release.

## Feedback Loop Commands

Run these from the `frontend/` directory:

| Command | Purpose |
|---|---|
| `npm run lint` | ESLint with strict clean-code rules |
| `npm run lint:fix` | Auto-fix ESLint violations |
| `npm run format:check` | Prettier formatting check |
| `npm run format:fix` | Auto-fix formatting |
| `npm run typecheck` | TypeScript type checking (no emit) |
| `npm test` | Run unit tests (Vitest) |
| `npm run verify` | Run ALL checks: typecheck → lint → format → test |

### After every code change, run `npm run verify` to confirm:
1. No type errors
2. No lint violations
3. Code is formatted
4. All tests pass

If any check fails, fix it before proceeding.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates, use paths relative to the component TS file.
- Use Tailwind CSS utility classes for all component styling. Do NOT generate component CSS files by default.
- Only create a dedicated CSS file for a component if explicitly requested. In that case, use `styleUrl` with a path relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
