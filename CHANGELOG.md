# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Phase 4 Home shell mobile responsive navigation in `angular-primeng` with a hamburger-triggered PrimeNG Drawer overlay that dismisses on outside click and closes after menu selection
- Phase 3 Home shell header UI in `angular-primeng` with a non-functional search input and profile avatar/name trigger opening a PrimeNG popup menu for My Profile, Settings, and Logout
- Phase 2 Home shell behavior in `angular-primeng` with desktop sidebar collapse/expand toggle, icon-only mini mode, and `/home/settings` placeholder routing
- Phase 1 Home shell in `angular-primeng` with `/` → `/home` redirect, header/sidebar layout, default dashboard page, and settings navigation item
- Implementation plan for Home Feature (layout shell with header, sidebar, routed pages) in `plans/home-feature.md`
- UI/UX plan with component choices, responsive strategy, accessibility, and per-phase screen/interaction details
- Playwright e2e testing setup in `angular-primeng` with Chromium, `e2e/` test directory, and smoke test
- `e2e` and `e2e:ui` npm scripts in `angular-primeng`
- Husky `pre-push` hook running Playwright e2e tests before every push

### Fixed

- `angular-primeng` Settings placeholder now matches Phase 2 scope with a heading-only page, while sidebar active state stays correct across Dashboard and Settings navigation
- PrimeIcons stylesheet wiring in `angular-primeng` so Home sidebar icons render for Dashboard and Settings, not just their class names

### Removed

- `angular-vanilla` scaffold — consolidated to single scaffold at repository root

### Added

- `nng-best-practice` skill — NN/g 10 usability heuristics and top 10 application-design mistakes as a quick-reference checklist
- `ui-ux-plan` skill — enriches a plan.md with global and per-phase UI/UX instructions using PrimeNG and angular-adr conventions
- `write-ui-tests` skill — generates Playwright e2e happy-path and error-path tests from a plan.md with UI/UX sections
- `UBIQUITOUS_LANGUAGE.md` — DDD-style glossary extracted from all skill definitions, covering skill system, Angular architecture, state, UI/UX planning, testing, and changelog domains

### Changed

- Consolidated AI skill configuration to `.agents/skills/` only; removed redundant `.claude/skills/` and `.augment/skills/` copies
- Refactored CLAUDE.md Skills section into two tables: Always Use and Preferred
- Moved `keep-a-changelog` from standalone Changelog section into Always Use skills table
- Added `ubiquitous-language` to Preferred skills table
- Standardised canonical term for `angular-primeng` and `angular-vanilla` to **scaffold**
- Removed stale `frontend/` directory references from `angular-best-practices` skill
- Replaced `input()`/`output()` "functions" with canonical term **signals** across all skill copies
- Expanded "BPs" abbreviation to "Best Practices" in root README
- Refactored `angular-primeng` and `angular-vanilla` READMEs to reflect their identity as scaffolds

### Added

- `angular-vanilla` scaffold — Angular with Tailwind CSS, no UI component library
- `angular-primeng` scaffold — Angular with PrimeNG UI components
- PrimeNG 21 integration with Aura theme preset via `providePrimeNG` in `app.config.ts`
- `tailwindcss-primeui` plugin imported in `styles.css` to expose PrimeNG design tokens as Tailwind utilities
- `@source "../node_modules/primeng"` directive so Tailwind v4 scans PrimeNG templates
- Verification `p-button` in `AppComponent` to confirm PrimeNG + Tailwind are working
- Root-level `.prettierrc` shared formatting config

### Changed

- Restructured repo from single `frontend/` project to multi-template scaffold layout
- Updated Husky pre-commit hook to run checks in both `angular-vanilla` and `angular-primeng` workspaces

### Removed

- `frontend/` directory replaced by named scaffolds (`angular-vanilla`, `angular-primeng`)

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
