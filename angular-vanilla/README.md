# angular-vanilla

Angular scaffold with Tailwind CSS and no UI component library. Use this as a lean starting point when you want full control over UI without an opinionated component library.

## Stack

- Angular 21 (standalone components, signals)
- Tailwind CSS v4
- Vitest for unit testing
- ESLint + Prettier

## Development server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app reloads automatically on file changes.

## Verify (lint + typecheck + format + test)

```bash
npm run verify
```

## Code generation

```bash
ng generate component component-name
ng generate --help
```

## Build

```bash
ng build
```

Artifacts are output to `dist/`. Production builds are optimized by default.

## Unit tests

```bash
ng test
```
