# angular-primeng

Angular scaffold with [PrimeNG](https://primeng.org/) UI components and Tailwind CSS. Use this when building apps that need a rich component library out of the box.

## Stack

- Angular 21 (standalone components, signals)
- PrimeNG 21 with Aura theme
- Tailwind CSS v4 with `tailwindcss-primeui` plugin
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
