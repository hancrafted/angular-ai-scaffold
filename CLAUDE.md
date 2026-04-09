You are an expert in Frontend and UI/UX development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

Unless otherwise stated, frontend implementation changes should be done in /angular-primeng directory by default, not in /angular-vanilla.

## Skills

### Always Use

These skills MUST be applied automatically — no user confirmation needed.

| Skill              | When to Use                                                                                                                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `grill-me`         | 1. Any plan or design before proceeding with implementation. 2. Before structural changes to configs, CI, or infrastructure. 3. Any task with UI/UX — ask specifically about UI/UX aspects. **ALWAYS ask one question at a time.** |
| `keep-a-changelog` | Before each commit, update `CHANGELOG.md` at the repository root.                                                                                                                                                                  |

### Preferred

These skills can be discovered and applied at the AI's discretion, or confirmed with the user when unsure.

| Skill                    | When to Use                                                         |
| ------------------------ | ------------------------------------------------------------------- |
| `angular-best-practices` | Task requires changes to the Angular codebase.                      |
| `angular-adr`            | Task requires adding or modifying a feature.                        |
| `ubiquitous-language`    | When making plans, defining domain terms, or hardening terminology. |

## Git Commit Conventions

- Use **Conventional Commits** format: `<type>(<scope>): <short description>`
  - Preferred Types: `feat`, `fix`, `refactor`, `test`.
  - Other Types: `chore`, `docs`, `ci`, `build`, `perf`, `style`.
  - Scope is optional but encouraged (e.g., `feat(auth): add login form`)
- In the commit body, include a summary of **why** the commit exists, not just what changed.
- Reference business cases, user stories, or issue numbers if they exist (e.g., `Closes #42`, `Relates to US-123`).

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