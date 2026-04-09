---
name: angular-adr
description: Angular application architecture guide covering component types (pages, smart, dumb), services, directives, pipes, state management, folder structure, and feature isolation. Use when designing Angular application structure, creating new features, deciding between component types, or planning state management.
---

# Angular Architecture Guide

## State Flow

URL is the single source of truth. URL + Auth (e.g. JWT) must be sufficient to restore the current page state.

```
URL State → Page State → Component State
```

- **URL State**: Route params and query params. The minimal, shareable representation of app state.
- **Page State**: Superset of URL State. Includes URL-derived values plus defaults for missing params.
- **Component State**: Local UI state. Can be persisted back to URL (e.g. a filter component writes to query params).

## State Management

- URL-based state management is the preferred approach.
- General guideline: RxJS in services, signals in components.
- Pages listen (router.queryParams, router.params) to URL changes and propagate state downward to components.
- Components that modify shared state write to the URL; the page reacts and redistributes.

## Pages

- A page is a routed top-level component. **Never consumed as a child component.**
- Each page defines **default state** for when URL query params are empty (e.g. default filters for a data table).
- Pages actively listen to URL changes and propagate state to smart and dumb components.
- Pages can inject services and consume both smart and dumb components.
- Pages are the orchestrators — they bridge URL state and component state.

## Smart Components

- Inject services, read and write from the URL.
- Receive data from pages via `input()` and emit events via `output()`.
- Can contain other smart components and dumb components.
- **Never routed to** — always consumed by a page or another smart component.

## Dumb Components

- Pure UI: render data and propagate user events via `input()` and `output()` signals.
- **No business logic.**
- May inject read-only global state services (e.g. `UserService` for display data).
- Can use template control flow (`@if`, `@switch`, `@for`).
- Rarely inject services, pipes, or directives — and never for business logic.

## Services

- Central place for all non-UI logic: business rules, API calls, global state.
- Return Observables (RxJS).
- Singleton services use `providedIn: 'root'`.

## Directives

- Encapsulate reusable DOM behavior and structural logic.
- **Permission directives are critical**: components declare the permission required, the directive evaluates it.
- Components never evaluate whether something is shown — they only declare the permission needed.

```html
<button *showIfHasPermission="'CAN_EDIT_USER'">Edit</button>
```

The directive injects the appropriate service and decides whether to render.

## Pipes

- Strictly for formatting and cached data transformation.
- Pure, stateless, no side effects.

## Folder Structure

```
src/app/
├── routing.ts                          # Top-level routes only (one entry per feature)
├── features/
│   └── user-management/
│       ├── index.ts                    # Barrel file (see Barrel Files section)
│       ├── routes.ts                   # Feature child routes, lazy-loaded from routing.ts
│       ├── pages/
│       │   ├── user-list.page.ts
│       │   └── user-detail.page.ts
│       ├── components/
│       │   ├── smart/
│       │   │   ├── user-filter.component.ts
│       │   │   └── user-table.component.ts
│       │   └── dumb/
│       │       ├── user-avatar.component.ts
│       │       └── user-badge.component.ts
│       ├── services/
│       │   └── user.service.ts
│       ├── directives/
│       │   └── show-if-has-permission.directive.ts
│       ├── pipes/
│       │   └── user-role-label.pipe.ts
│       └── models/
│           └── user.model.ts
└── shared/
    ├── components/                     # Reusable dumb components only
    ├── directives/
    ├── pipes/
    ├── services/                       # App-wide singletons (auth, notifications)
    ├── guards/
    ├── interceptors/
    ├── utils/
    ├── models/
    └── index.ts
```

## Routing

- **One top-level `routing.ts`** at app root: defines first-level routes, one per feature, with permission guards.
- **One `routes.ts` per feature**: defines child routes, lazy-loaded from the top-level file.
- Top-level file provides a single overview of all features and route-level permissions.

## Feature Isolation

- Features **never import from another feature**.
- Features may import from `shared/` only.
- The `shared/` folder is **never modified during feature development** — changes to shared are always a separate process.
- A component/directive/pipe moves to `shared/` only when consumed by **two or more features** — never preemptively.

## Barrel Files (`index.ts`)

- Every feature has an `index.ts` that **imports everything** in the feature folder.
- It **exports only the public API** (routes, shared types/models).
- AI must add comments describing each import for progressive disclosure and discoverability.
- Files within the feature import using **direct relative paths**, never through the barrel.
- External consumers (e.g. `routing.ts`) import from the barrel.
- AI updates `index.ts` comments whenever the feature's contents change.
