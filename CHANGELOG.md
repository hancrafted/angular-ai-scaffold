# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

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
