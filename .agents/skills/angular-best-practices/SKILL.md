---
name: angular-best-practices
description: Angular, TypeScript, and accessibility best practices for building scalable web applications. Use when writing Angular components, services, templates, or state management.
---

# Angular Best Practices

## Feedback Loop

Run these from the project directory:

| Command | Purpose |
|---|---|
| `npm run lint` | ESLint with strict clean-code rules |
| `npm run lint:fix` | Auto-fix ESLint violations |
| `npm run format:check` | Prettier formatting check |
| `npm run format:fix` | Auto-fix formatting |
| `npm run typecheck` | TypeScript type checking (no emit) |
| `npm test` | Run unit tests (Vitest) |
| `npm run verify` | Run ALL checks: typecheck → lint → format → test |

After every code change, run `npm run verify`. Fix failures before proceeding.

## TypeScript

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid `any`; use `unknown` when type is uncertain

## Angular

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators — it's the default in Angular v20+
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use `@HostBinding` / `@HostListener` — use the `host` object in `@Component` or `@Directive` instead
- Use `NgOptimizedImage` for all static images (`NgOptimizedImage` does not work for inline base64 images)

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` signals instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass` — use `class` bindings instead
- Do NOT use `ngStyle` — use `style` bindings instead
- When using external templates, use paths relative to the component TS file
- Use Tailwind CSS utility classes for all component styling — do NOT generate component CSS files by default
- Only create a dedicated CSS file if explicitly requested; use `styleUrl` with a relative path

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals — use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like `new Date()` are available

## Services

- Design services around a single responsibility
- Use `providedIn: 'root'` for singleton services
- Use `inject()` instead of constructor injection

## Accessibility

- Must pass all AXE checks
- Must follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes
