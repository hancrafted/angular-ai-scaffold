---
name: write-ui-tests
description: Write Playwright e2e tests from a plan.md that has UI/UX instructions. Generates a happy-path test and at least one error-path test per phase, acting as acceptance criteria for the implementor. Use when a plan.md with UI/UX sections exists and user wants to write e2e tests, UI tests, or acceptance tests before implementation.
---

# Write UI Tests

Generate Playwright e2e tests from a plan.md enriched with UI/UX instructions (output of `ui-ux-plan`). These tests serve as the **outer acceptance loop** — the implementor uses them to know when a phase is done.

## Prerequisites

- A `plan.md` with `## UI/UX Plan` and per-phase `### UI/UX` sections must exist in `./plans/`.
- Playwright must be installed. If not, instruct the user to run: `npm init playwright@latest` from the project directory and configure it.

## Process

### 1. Verify Playwright setup

Check that the project has Playwright configured:

- `playwright.config.ts` exists in the project root
- `@playwright/test` is in devDependencies

If missing, stop and ask the user to install Playwright first.

### 2. Read the plan

Load the plan.md. For each phase, extract:

- Acceptance criteria (the checkboxes)
- UI/UX subsection (screens, interactions, validation & errors)
- URL/routing expectations from architectural decisions

### 3. Write tests per phase

For each phase, create a test file at `e2e/<phase-slug>.spec.ts`. Each file contains:

#### Happy path (required)

One `test()` that walks through the primary user workflow end-to-end:

- Navigate to the correct URL
- Interact with the UI (fill forms, click buttons, select options)
- Assert the expected outcome (navigation, content displayed, toast shown)

#### Error path(s) (at least one per phase)

One or more `test()` cases covering:

- Form validation errors (submit with empty required fields, invalid input)
- Server error handling (if applicable — use route interception to mock 4xx/5xx)
- Edge cases from the "Validation & errors" section of the UI/UX plan

### 4. Test conventions

Follow these conventions in all generated tests:

```typescript
// File: e2e/<phase-slug>.spec.ts
import { test, expect } from '@playwright/test';

test.describe('<Phase title>', () => {
  test('happy path: <short description>', async ({ page }) => {
    await page.goto('/<route>');
    // ... interactions and assertions
  });

  test('error: <short description>', async ({ page }) => {
    await page.goto('/<route>');
    // ... trigger error and assert error state
  });
});
```

**Rules:**

- Use `page.getByRole()`, `page.getByLabel()`, `page.getByText()` — prefer accessible locators over CSS selectors
- Use `page.getByTestId()` only as a last resort
- Each test must be independent — no shared mutable state between tests
- Use `test.describe` to group tests by phase
- Use descriptive test names that read as user actions: `'happy path: user creates a new order'`
- Mock API calls with `page.route()` when testing against backend responses
- Assert URL changes with `await expect(page).toHaveURL()`

### 5. Review with user

Present the generated tests and ask:

- Do the happy paths cover the most important user journey for each phase?
- Are the error paths covering the riskiest interactions?
- Any edge cases missing?

Iterate until approved.

## Output

Test files are written to `e2e/` in the project directory (default: `angular-primeng/e2e/`). One file per phase.
