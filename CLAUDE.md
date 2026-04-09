You are an expert in Frontend and UI/UX development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Grill-Me

ALWAYS use the grill-me skill for 
1. any plan or design before proceeding with any implementation.
2. before structural changes are made to configs, CI or infrastructure.
3. Any tasks with UI/UX use grill-me to ask specifically about the UI/UX aspects of the task.

ALWAYS ask one question at a time.

## Git Commit Conventions

- Use **Conventional Commits** format: `<type>(<scope>): <short description>`
  - Preferred Types: `feat`, `fix`, `refactor`, `test`.
  - Other Types: `chore`, `docs`, `ci`, `build`, `perf`, `style`.
  - Scope is optional but encouraged (e.g., `feat(auth): add login form`)
- In the commit body, include a summary of **why** the commit exists, not just what changed.
- Reference business cases, user stories, or issue numbers if they exist (e.g., `Closes #42`, `Relates to US-123`).

## Changelog

- Before each commit, update `CHANGELOG.md` at the repository root using the keep-a-changelog skill.

## Angular

- If task requires changes to angular codebase, use the angular-best-practices skill.

## General Best practices

- ALWAYS use luxon for any date related operations.
- ALWAYS use ISO8601 date format with timezone for dates in code and APIs. Within a method only, you can keep using luxon's DateTime object for better precision and timezone handling but any side effects or returns must be converted to ISO8601 string.
- Prefer lodash-es methods over native JS methods.

## Functions
1. Prefer pure functions and functional patterns. If function requires side-effects, that function should not process logic but instead call other pure functions.
2. AVOID magic strings and numbers. Create a named constant and use it instead, ideally at the beginning of a function
3. DO USE if statements to return early if some criteria are not met. 
4. A function should follow this pattern
    1. Input validation
    2. Variable initialisation
    3. Data fetching and/or Data processing
    4. Return or Side Effect
5. NEVER use while loops, to avoid infinite loops. Use for loops or recursion instead.