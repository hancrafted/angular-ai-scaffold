---
name: ui-ux-plan
description: Propose a UI/UX plan for a feature based on an existing plan.md, grill the user on layout, interactions, and component choices, then update plan.md with global and per-phase UI/UX instructions. Use when a plan.md exists and the feature involves UI changes, screens, or user-facing workflows.
---

# UI/UX Plan

Take an existing `plan.md` (output of `prd-to-plan`) and enrich it with concrete UI/UX instructions — both cross-cutting and per-phase.

## Prerequisites

- A `plan.md` file must already exist in `./plans/`.
- The `angular-adr` skill should be loaded for component-type decisions (page, smart, dumb).
- The `nng-best-practice` skill should be loaded for general UI/UX principles.
- Read https://primeng.org/llms/llms.txt to get a basic understanding of the UI components and their usage.
    - Optionally read the full documentation at  https://primeng.org/llms/llms-full.txt if you decided to use a component you're not familiar with, to understand its features and limitations.

## Process

### 1. Read the plan

Load the plan.md file. Identify each phase's "What to build" and "Acceptance criteria" sections.

### 2. Explore the codebase

Understand the current UI landscape:

- Existing layout shell, navigation, and routing structure
- PrimeNG components already in use
- Shared components available
- Design patterns established (spacing, typography, form layouts)

### 3. Draft the global UI/UX section

Propose a `## UI/UX Plan` section to be inserted after `## Architectural decisions` in plan.md. This covers cross-cutting concerns:

- **Layout & navigation**: where the feature lives in the app shell, menu placement, breadcrumbs
- **Design system usage**: which PrimeNG components to use and why (e.g. p-table vs p-listbox, p-dialog vs p-drawer)
- **Responsive behaviour**: breakpoint strategy, mobile-first considerations
- **Accessibility**: keyboard navigation, ARIA patterns, focus management
- **Shared patterns**: form layout conventions, error display, loading states, empty states

### 4. Draft per-phase UI/UX subsections

For each phase, propose a `### UI/UX` subsection after "What to build". Each should describe:

- **Screen(s)**: what the user sees, key visual areas
- **Interactions**: user actions, transitions, feedback (toasts, inline errors)
- **Component breakdown**: which components are pages, smart, or dumb (per angular-adr)
- **State & URL**: what state is reflected in the URL, what triggers navigation
- **Validation & errors**: which fields validate, when, and how errors display

### 5. Grill the user

Present the full UI/UX proposal and challenge the user on each decision — one question at a time. Focus on:

- Is this the right PrimeNG component for this use case?
- Does the interaction model match user expectations?
- Are error states and edge cases covered?
- Is the component breakdown at the right granularity?
- Does the responsive strategy make sense for this feature?

Iterate until the user approves.

### 6. Update plan.md

Write the approved UI/UX instructions into the existing plan.md:

1. Insert `## UI/UX Plan` section after `## Architectural decisions`
2. Insert `### UI/UX` subsection into each phase after `### What to build`
3. Do NOT modify existing "What to build" or "Acceptance criteria" content

## Output format

The global section follows this structure:

```md
## UI/UX Plan

Cross-cutting UI/UX decisions that apply across all phases:

- **Layout & navigation**: ...
- **Design system**: ...
- **Responsive**: ...
- **Accessibility**: ...
- **Shared patterns**: ...
```

Each per-phase subsection follows this structure:

```md
### UI/UX

- **Screen(s)**: ...
- **Interactions**: ...
- **Component breakdown**: Page: ..., Smart: ..., Dumb: ...
- **State & URL**: ...
- **Validation & errors**: ...
```
