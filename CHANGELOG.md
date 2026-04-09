# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `angular-vanilla` scaffold template — Angular with Tailwind CSS, no UI component library
- `angular-primeng` scaffold template — Angular with PrimeNG UI components
- PrimeNG 21 integration with Aura theme preset via `providePrimeNG` in `app.config.ts`
- `tailwindcss-primeui` plugin imported in `styles.css` to expose PrimeNG design tokens as Tailwind utilities
- `@source "../node_modules/primeng"` directive so Tailwind v4 scans PrimeNG templates
- Verification `p-button` in `AppComponent` to confirm PrimeNG + Tailwind are working
- Root-level `.prettierrc` shared formatting config

### Changed

- Restructured repo from single `frontend/` project to multi-template scaffold layout
- Updated Husky pre-commit hook to run checks in both `angular-vanilla` and `angular-primeng` workspaces

### Removed

- `frontend/` directory replaced by named scaffold templates (`angular-vanilla`, `angular-primeng`)

---

### Added (previous)

- Initial Angular 21 project setup with standalone components
- ESLint with strict clean-code rules (typescript-eslint strict + angular-eslint tsAll/templateAll)
- Prettier formatting integration
- TypeScript strict type checking
- Vitest unit testing setup
- Tailwind CSS integration via PostCSS
- `npm run verify` command for running all checks in sequence
- Red-Green-Refactor TDD workflow documented in CLAUDE.md
- Grill-me skill best practice for AI-assisted development
- Conventional Commits and Keep a Changelog standards
- Pre-commit hook via Husky running prettier, typecheck, eslint, and unit tests

### Changed

- Refactored AI configuration to root level with skills-based architecture
- Moved Angular-specific best practices from CLAUDE.md into `angular-best-practices` skill
- Added `keep-a-changelog` skill for changelog maintenance
- Simplified CLAUDE.md to a lean entry point referencing skills
- Replaced `lodash` with `lodash-es` for proper tree-shaking support
- Updated CLAUDE.md: added all conventional commit types, clarified lodash-es usage, refined function guidelines, fixed typos
