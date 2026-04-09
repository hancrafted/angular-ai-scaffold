# Ubiquitous Language

Domain: AI-assisted Angular frontend development workflow, as expressed across the project's skill definitions.

---

## Skill System

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Skill** | A self-contained, reusable AI instruction set stored in `.agents/skills/<name>/SKILL.md` that teaches the agent a specialised capability | Plugin, rule, prompt, instruction |
| **Plan** | The artifact produced by `prd-to-plan`; a structured implementation roadmap saved as `./plans/plan.md` | Spec, design doc, ticket |
| **Phase** | A discrete, independently deliverable unit of work within a **Plan**; the plan is divided into phases that are sequentially implemented and tested | Step, sprint, iteration, milestone |
| **PRD** | A Product Requirements Document; the human-authored brief that feeds into `prd-to-plan` to produce a **Plan** | Requirements doc, spec |
| **Acceptance Criteria** | Checkboxes in a **Phase** that define done — used directly as the basis for **E2E Tests** | Success criteria, definition of done |

---

## Angular Architecture

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Page** | A routed, top-level Angular component; the orchestrator that bridges **URL State** and **Component State** — never consumed as a child | Screen (as a code concept), view, container |
| **Smart Component** | An Angular component that injects services and reads/writes the URL; consumes **Dumb Components** and is always consumed by a **Page** | Container component, stateful component |
| **Dumb Component** | A pure-UI Angular component that receives data via `input()` and emits events via `output()` with no business logic | Presentational component, display component, pure component |
| **Feature** | An isolated, self-contained vertical slice of the application living under `src/app/features/<name>/` — never importing from another **Feature** | Module, domain, section |
| **Barrel File** | The `index.ts` at the root of a **Feature** that imports everything internally and exports only the public API | Index file, re-export file |
| **Permission Directive** | A structural directive that evaluates whether to render its host element based on the user's permissions; components only declare the required permission, never evaluate it | Auth guard (for component-level use), visibility directive |
| **Service** | A singleton Angular class (`providedIn: 'root'`) that holds business logic, API calls, and global state; returns Observables | Store, repository, manager |

---

## State

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **URL State** | The minimal, shareable set of route params and query params that fully identifies a page's context; the single source of truth | App state, router state |
| **Page State** | The superset of **URL State** augmented with defaults for any missing params; owned and maintained by the **Page** | View state, resolved state |
| **Component State** | Local UI state scoped to a single component; may be written back to the URL when shared state is affected | Local state, widget state |
| **Signal** | Angular's reactive primitive used for **Component State** and **Page State**; prefer over RxJS subjects inside components | Observable (for component state), BehaviorSubject (for component state) |

---

## Planning & UI/UX

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Screen** | The visual surface a user sees for a given route, as described in the UI/UX plan — a design concept, not a code artifact | Page (in the UX sense), view |
| **Interaction** | A named user action and its expected system response (e.g. form submit → toast confirmation), documented in the per-phase UI/UX section | Behaviour, flow, event |
| **Component Breakdown** | The per-phase classification of every UI element as a **Page**, **Smart Component**, or **Dumb Component**, per `angular-adr` | Component map, UI inventory |

---

## Testing

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **E2E Test** | A Playwright test that exercises a full user workflow through the real browser; generated from a **Plan** with UI/UX sections | Integration test (for browser-level tests), functional test |
| **Happy Path** | The E2E test case covering the primary, success-case user journey for a **Phase** | Sunny day, positive path |
| **Error Path** | One or more E2E test cases covering validation failures, server errors, and edge cases for a **Phase** | Sad path, negative test, failure case |

---

## Changelog & Releases

| Term | Definition | Aliases to avoid |
| --- | --- | --- |
| **Changelog** | The `CHANGELOG.md` file at the repository root maintained per Keep a Changelog v1.1.0 | Release notes, history |
| **Unreleased** | The topmost `CHANGELOG.md` section that accumulates changes not yet assigned to a version | In-progress, next, draft |
| **Release** | A versioned section in `CHANGELOG.md` with a date stamp, following Semantic Versioning | Tag, deploy, publish |
| **Yanked Release** | A **Release** that has been retracted after publication, marked with `[YANKED]` | Reverted release, rolled-back version |

---

## Relationships

- A **PRD** is the input to `prd-to-plan`; it produces exactly one **Plan**.
- A **Plan** is divided into one or more **Phases**; each **Phase** has **Acceptance Criteria**.
- A **Phase** maps to one or more **Screens**; each **Screen** is implemented as a **Page** plus **Smart** and **Dumb Components**.
- **E2E Tests** are derived from **Acceptance Criteria** and the UI/UX **Interactions** of a **Phase**.
- Every **Phase** shipped triggers a **Changelog** entry under **Unreleased**.
- **URL State** ⊆ **Page State** ⊇ **Component State**.

---

## Example dialogue

> **Dev:** "Should this filter panel be a **Smart Component** or a **Dumb Component**?"

> **Domain expert:** "If it reads from or writes to the URL, it's a **Smart Component**. If the **Page** passes the current filters as inputs and the panel just emits changes, it's **Dumb**."

> **Dev:** "The filter also calls an API to populate the dropdown options."

> **Domain expert:** "Then it's definitely **Smart** — it injects a **Service** to fetch those options. The **Page** orchestrates it, but the component owns the API call."

> **Dev:** "And when the user changes a filter, should we update **URL State** immediately?"

> **Domain expert:** "Yes — the **Smart Component** writes to the URL; the **Page** reacts to the URL change and propagates new **Page State** downward. Never bypass the URL for shared state."

---

## Flagged ambiguities

- **"Screen" vs "Page"**: In UX planning (the `ui-ux-plan` skill), *screen* is used as a design concept. In Angular code (the `angular-adr` skill), *page* is the canonical code term. These are distinct: a **Screen** is what the user sees; a **Page** is the Angular component that renders it. Do not use "screen" in code or "page" in design deliverables.
- **"Component"** (unqualified): Used to mean any of **Page**, **Smart Component**, or **Dumb Component**. Always qualify the type when the distinction matters.
- **"State"** (unqualified): Overlaps across **URL State**, **Page State**, **Component State**, and UX system-status feedback. Always qualify which layer is meant.
- **"Feature"** (unqualified): Used to mean both the Angular folder-structure unit and a product capability in PRDs. When referring to code, say **Feature** (Angular); when referring to product intent, say *capability* or *requirement*.
- **"Route"**: Used both as an Angular Router configuration object and as a URL path string. Prefer *route definition* for the Angular object and *URL path* for the string.
