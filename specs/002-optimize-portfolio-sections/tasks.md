# Implementation Tasks: Portfolio Sections & User Experience Optimization

**Feature**: Portfolio Sections & User Experience Optimization (`002-optimize-portfolio-sections`)  
**Specification**: [specs/002-optimize-portfolio-sections/spec.md](spec.md)  
**Implementation Plan**: [specs/002-optimize-portfolio-sections/plan.md](plan.md)  

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare project data structures and core stylesheet foundations for UI enhancements.

- [X] T001 [P] Enrich project schema data with domain category classifications in src/data/projects.json
- [X] T002 [P] Configure shared CSS tokens and utilities for badges, filter buttons, and toasts in src/css/main.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core accessibility and theme synchronization structures required before user story implementations.

**⚠️ CRITICAL**: Foundational tasks must be completed before verifying user story functionality.

- [X] T003 Add accessibility skip-to-content link and main landmark in index.html and src/App.jsx
- [X] T004 [P] Establish shared theme synchronization helper for cross-page persistence in src/App.jsx and src/Blog.jsx

**Checkpoint**: Foundation ready - project data, accessibility landmarks, and theme persistence are established.

---

## Phase 3: User Story 1 - Project Showcase Discovery and Category Filtering (Priority: P1) 🎯 MVP

**Goal**: Deliver interactive category filtering (`All`, `Backend & APIs`, `AI & LLMs`, `Cloud & Infrastructure`) with immediate layout updates and distinct repository/demo links.

**Independent Test**: Navigate to `#projects`, toggle category filters, and verify that matching project cards update in <100ms with accessible links.

- [X] T005 [P] [US1] Write unit tests for project category filtering state and rendering in src/App.test.jsx
- [X] T006 [US1] Implement category filter bar and state filtering in src/App.jsx
- [X] T007 [US1] Style project filter buttons and active indicator states in src/css/main.css
- [X] T008 [US1] Add distinct GitHub repository and live demonstration links to project cards in src/App.jsx

**Checkpoint**: User Story 1 is functional and verifiable independently as a Minimum Viable Product.

---

## Phase 4: User Story 2 - Consistent & Readable Technical Article Reading (Priority: P2)

**Goal**: Ensure the blog reader page provides dark/light theme parity, high-contrast code block formatting, reading time metadata, and smooth return navigation.

**Independent Test**: Navigate to `/blog/dsa-to-dev`, toggle the theme, verify monospaced code block contrast and scrolling, and return to `#blog`.

- [X] T009 [P] [US2] Implement theme toggle and persistent dark mode support in src/Blog.jsx
- [X] T010 [US2] Enhance article metadata display with formatted date and reading duration in src/Blog.jsx
- [X] T011 [US2] Style technical code blocks with high contrast background and horizontal scroll in src/css/main.css

**Checkpoint**: Both User Story 1 and User Story 2 work independently with full visual consistency.

---

## Phase 5: User Story 3 - Frictionless Recruiter Outreach & Quick-Actions (Priority: P3)

**Goal**: Provide 1-click clipboard email copying with confirmation feedback, an active availability badge in the hero, dual hero CTAs, and live form feedback.

**Independent Test**: Click "Copy Email" in hero/contact to verify clipboard copy and 2-second toast, verify availability badge and form validation feedback.

- [X] T012 [P] [US3] Implement 1-click copy-to-clipboard email action with feedback toast in src/App.jsx
- [X] T013 [US3] Add active availability badge and dual CTA buttons (View Projects & Resume) to hero in src/App.jsx
- [X] T014 [US3] Style availability pulsing badge, dual hero buttons, and copy feedback toast in src/css/main.css
- [X] T015 [US3] Enhance contact form input validation with immediate visual feedback in src/App.jsx

**Checkpoint**: User Stories 1, 2, and 3 are functionally verified.

---

## Phase 6: User Story 4 - Accessible Navigation, Search Visibility, and Visual Polish (Priority: P4)

**Goal**: Provide rich OpenGraph/Twitter Cards social preview metadata, Schema.org JSON-LD structured data, and image lazy loading to prevent layout shifts.

**Independent Test**: Inspect `index.html` head tags for OpenGraph/JSON-LD compliance and verify image `loading="lazy"` attributes.

- [X] T016 [P] [US4] Add OpenGraph, Twitter Cards, and Schema.org JSON-LD Person metadata to index.html
- [X] T017 [US4] Add lazy loading and explicit dimension constraints on preview images in src/App.jsx

**Checkpoint**: All user stories are implemented and verified.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Execute comprehensive automated testing, build compilation, and end-to-end validation.

- [X] T018 [P] Update unit test suite in src/App.test.jsx to cover new filters, clipboard action, and hero CTAs
- [X] T019 Run complete test suite and production build verification via npm test && npm run build
- [X] T020 Execute quickstart end-to-end validation checklist from specs/002-optimize-portfolio-sections/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1: Setup (T001, T002)
       │
       ▼
Phase 2: Foundational (T003, T004)
       │
       ├───────────────────────────────────────────┐
       ▼                                           ▼
Phase 3: User Story 1 (P1 MVP)              Phase 4: User Story 2 (P2)
(T005 ─► T006 ─► T007 ─► T008)              (T009 ─► T010 ─► T011)
       │                                           │
       ├───────────────────────────────────────────┘
       ▼
Phase 5: User Story 3 (P3)
(T012 ─► T013 ─► T014 ─► T015)
       │
       ▼
Phase 6: User Story 4 (P4)
(T016 ─► T017)
       │
       ▼
Phase 7: Polish & Verification (T018, T019, T020)
```

- **Setup (Phase 1)**: Can begin immediately.
- **Foundational (Phase 2)**: Depends on Setup; blocks user stories.
- **User Stories (Phases 3–6)**: Can proceed sequentially in priority order (P1 → P2 → P3 → P4) or in parallel.
- **Polish (Phase 7)**: Executes after all story tasks are complete.

---

## Parallel Execution Examples

### Parallel Opportunities in Setup & Foundation
```bash
# Run in parallel:
Task T001: "Enrich project schema data with domain category classifications in src/data/projects.json"
Task T002: "Configure shared CSS tokens and utilities for badges, filter buttons, and toasts in src/css/main.css"
Task T004: "Establish shared theme synchronization helper for cross-page persistence in src/App.jsx and src/Blog.jsx"
```

### Parallel Opportunities Across User Stories
```bash
# After Phase 2 completes, these can run in parallel:
Task T005: "[US1] Write unit tests for project category filtering state and rendering in src/App.test.jsx"
Task T009: "[US2] Implement theme toggle and persistent dark mode support in src/Blog.jsx"
Task T012: "[US3] Implement 1-click copy-to-clipboard email action with feedback toast in src/App.jsx"
Task T016: "[US4] Add OpenGraph, Twitter Cards, and Schema.org JSON-LD Person metadata to index.html"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Phase 1: Setup (`projects.json` categories, CSS variables).
2. Complete Phase 2: Foundational (Skip link, theme helper).
3. Complete Phase 3: User Story 1 (Interactive category filtering).
4. **Validate**: Test filtering on `#projects` to ensure instant updates.

### Incremental Delivery
1. Foundation + US1 = Dynamic project showcase (MVP).
2. US2 = Consistent, legible article reading with dark mode parity.
3. US3 = Frictionless recruiter outreach (Copy email, availability badge, hero CTAs).
4. US4 = Accessibility (WCAG 2.1 AA), rich SEO metadata, and Core Web Vitals stability.
5. Polish = Comprehensive test suite execution and production bundle verification.
