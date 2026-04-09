# Plan: Home Feature — Layout Shell with Header, Sidebar, and Routed Pages

> Source PRD: [GitHub Issue #1](https://github.com/hancrafted/angular-ai-scaffold/issues/1)

## Architectural decisions

Durable decisions that apply across all phases:

- **Routes**:
  - `/` → redirect to `/home`
  - `/home` → layout shell (smart component) with lazy-loaded child routes
    - ` ` (default) → Dashboard page
    - `settings` → Settings page
- **Feature structure**: `features/home/` with `routes.ts`, `index.ts` barrel, following `angular-adr` conventions
- **Component architecture**:
  - Layout shell = smart component (manages state, orchestrates children)
  - Header, Sidebar = dumb components (inputs/outputs only)
  - Dashboard, Settings = page components (static placeholders)
- **UI library**: PrimeNG components (Drawer, Menu/Popover, Button, InputText, Avatar) + Tailwind CSS for layout
- **Icons**: PrimeIcons — `pi pi-home` (Dashboard), `pi pi-cog` (Settings)
- **State**: Sidebar collapsed state via Angular signal, local to layout shell — no global state
- **Responsive breakpoint**: Sidebar becomes overlay drawer below `lg` (1024px)
- **Menu items**: Data-driven array of objects so new features only require adding an entry

---

## UI/UX Plan

Cross-cutting UI/UX decisions that apply across all phases:

- **Layout & navigation**: The home feature **is** the app shell. Three-region layout: fixed header (top, full width, ~56px), sidebar (left, below header, ~240px expanded / ~64px collapsed), content area (right of sidebar, vertically scrollable). Sidebar is the primary navigation. No breadcrumbs at this stage.
- **Design system**:
  - Sidebar nav items: Custom list with `routerLink` + `routerLinkActive` — not PrimeNG `Menu`, which is designed for popup/command menus and lacks collapse-to-icon support.
  - Profile dropdown: PrimeNG `Menu` in popup mode (`popup=true`, `toggle(event)`) — handles overlay positioning and outside-click dismissal natively.
  - Mobile sidebar: PrimeNG `Drawer` (position=left, modal=true), reusing the same sidebar nav content.
  - Search input: PrimeNG `IconField` + `InputIcon` + `InputText` for the search icon inside the input.
  - Profile avatar: PrimeNG `Avatar` (label-based, showing initials).
  - Buttons: PrimeNG `Button` for toggle and hamburger — `text` severity, icon-only variants.
- **Responsive**: Below `lg` (1024px): sidebar hidden, hamburger in header, sidebar as `Drawer` overlay. At `lg`+: sidebar inline, collapsible. Header always visible. Dual-rendering approach: inline sidebar (`hidden lg:block`) and `Drawer` sidebar (`lg:hidden`) coexist in the DOM — sidebar content is lightweight enough to duplicate.
- **Accessibility**: Sidebar nav uses `<nav>` landmark with `aria-label="Main navigation"`. Menu items are `<a>` elements with `routerLink` (natively focusable). Toggle button has `aria-expanded` bound to collapsed state and `aria-label="Toggle sidebar"`. Profile dropdown trigger has `aria-haspopup="true"`. Mobile Drawer traps focus when open.
- **Shared patterns**: Sidebar items are data-driven — an array of `{ label, icon, routerLink }` objects. No loading, empty, or error states needed (all static content). Sidebar collapse uses CSS `transition: width 200ms ease` — no Angular animations.

---

## Phase 1: Layout Shell with Static Sidebar Navigation

**User stories**: US-1, US-2, US-3, US-9, US-13

### What to build

Wire up the route structure so `/` redirects to `/home`, which renders a layout shell containing a header (text logo only), a sidebar with a list of menu items using `routerLinkActive` highlighting, and a `<router-outlet>` that renders the Dashboard placeholder page by default. The sidebar and header are dumb components receiving inputs from the layout shell. The Dashboard page shows a heading and welcome message.

### UI/UX

- **Screen(s)**: Three-panel layout. Header spans full width at top (~56px). Sidebar on the left (~240px) with menu items listed vertically. Content area fills remaining space. Dashboard page shows `<h1>` heading and `<p>` welcome text.
- **Interactions**: Clicking a menu item navigates via `routerLink`. Active item is highlighted with a background color and bold text via `routerLinkActive` CSS class. No animations in this phase.
- **Component breakdown**: Page: `dashboard.page.ts`. Smart: `home-layout.component.ts` (layout shell). Dumb: `home-header.component.ts`, `home-sidebar.component.ts`.
- **State & URL**: `/home` renders layout with dashboard as default child. No query params. URL drives which page is shown.
- **Validation & errors**: None — all static.

### Acceptance criteria

- [ ] Navigating to `/` redirects to `/home`
- [ ] `/home` renders the layout shell with header, sidebar, and content area
- [ ] Header displays a text logo
- [ ] Sidebar displays menu items (Dashboard, Settings) with icons
- [ ] Dashboard menu item is visually active by default
- [ ] Dashboard page shows a heading and welcome text in the content area
- [ ] Layout uses flexbox/grid via Tailwind CSS

---

## Phase 2: Sidebar Collapse & Settings Page

**User stories**: US-4, US-5, US-6, US-7, US-8

### What to build

Add the Settings placeholder page at `/home/settings` and implement the sidebar collapse/expand toggle. Clicking the toggle collapses the sidebar to an icon-only mini mode; clicking again restores full width with labels. Active-route highlighting updates correctly when navigating between Dashboard and Settings.

### UI/UX

- **Screen(s)**: Settings page shows `<h1>` heading only. Sidebar has two visual states: expanded (240px, icon + label) and collapsed (~64px, icon only with `p-tooltip` on hover showing the label).
- **Interactions**: Toggle button (in sidebar) collapses/expands. CSS `transition: width 200ms ease` animates the width change. Collapsed items show only the icon; hovering shows a tooltip with the label. Clicking a collapsed icon still navigates.
- **Component breakdown**: Page: `settings.page.ts`. Others remain the same as Phase 1.
- **State & URL**: `/home/settings` renders settings page. Sidebar collapsed state is a signal — not persisted to URL (ephemeral UI state).
- **Validation & errors**: None.

### Acceptance criteria

- [ ] Navigating to `/home/settings` renders the Settings page with a heading
- [ ] Clicking a toggle button collapses the sidebar to icon-only mini mode
- [ ] Collapsed sidebar still shows icons that are clickable for navigation
- [ ] Clicking the toggle again expands the sidebar back to full width with labels
- [ ] Active menu item highlighting updates when navigating between pages

---

## Phase 3: Header Search & Profile Dropdown

**User stories**: US-10, US-11, US-12

### What to build

Add a placeholder search input and a user profile dropdown to the header. The search bar is non-functional. The profile area shows an avatar/name that opens a dropdown with "My Profile", "Settings", and "Logout" items — all non-functional placeholders.

### UI/UX

- **Screen(s)**: Header has three zones: left (logo + hamburger on mobile), center (search input), right (profile avatar + name). Profile dropdown shows three items with icons: "My Profile" (`pi pi-user`), "Settings" (`pi pi-cog`), "Logout" (`pi pi-sign-out`).
- **Interactions**: Clicking avatar/name calls `menu.toggle(event)` to open PrimeNG `Menu` (popup mode) positioned below the trigger. Clicking outside or pressing Escape closes it. Search input is visually present but non-functional (placeholder text only). Dropdown items do nothing on click.
- **Component breakdown**: All within the existing dumb header component. `Menu` and `Avatar` are PrimeNG template concerns — no new components needed.
- **State & URL**: No URL changes. Menu open/close is local PrimeNG state.
- **Validation & errors**: None.

### Acceptance criteria

- [ ] Header contains a search input (placeholder, non-functional)
- [ ] Header contains a profile avatar/name button
- [ ] Clicking the profile button opens a dropdown menu
- [ ] Dropdown shows "My Profile", "Settings", and "Logout" items
- [ ] Dropdown items are visible but non-functional

---

## Phase 4: Mobile Responsive Sidebar

**User stories**: US-14, US-15, US-16

### What to build

Make the sidebar responsive. On screens below the `lg` breakpoint, the sidebar is hidden by default and a hamburger icon appears in the header. Tapping the hamburger opens the sidebar as a PrimeNG Drawer overlay. The drawer closes when tapping outside it or selecting a menu item.

### UI/UX

- **Screen(s)**: On small screens, header shows hamburger icon (left), logo (next to hamburger), search and profile (right). Sidebar is completely hidden. PrimeNG `Drawer` slides in from the left as a modal overlay with a scrim backdrop.
- **Interactions**: Tap hamburger → Drawer opens with same sidebar nav content. Tap outside (modal scrim) → Drawer closes via `visibleChange` event. Select a menu item → Drawer closes and navigation occurs. Dual-rendering: inline sidebar uses `hidden lg:block`, Drawer sidebar uses `lg:hidden`.
- **Component breakdown**: Layout shell smart component manages `drawerVisible` signal. No new components — the existing sidebar dumb component is rendered inside both the inline container and the `p-drawer`.
- **State & URL**: `drawerVisible` is ephemeral signal state, not URL-persisted. Navigation triggers drawer close.
- **Validation & errors**: None.

### Acceptance criteria

- [ ] On screens below `lg`, the sidebar is hidden by default
- [ ] A hamburger icon appears in the header on small screens
- [ ] Tapping the hamburger opens the sidebar as an overlay drawer
- [ ] Tapping outside the drawer closes it
- [ ] Selecting a menu item in the drawer closes it
- [ ] On screens at or above `lg`, the sidebar behaves as in previous phases (inline, collapsible)
