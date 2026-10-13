# Implementation Tasks: Migration to Render Hosting

**Feature**: Migration to Render Hosting (`001-migrate-to-render`)  
**Specification**: [specs/001-migrate-to-render/spec.md](spec.md)  
**Implementation Plan**: [specs/001-migrate-to-render/plan.md](plan.md)  

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish configuration files and prepare the repository for clean automated deployments to Render.

- [X] T001 Create Render blueprint configuration in render.yaml
- [X] T002 [P] Clean up build artifact tracking in .gitignore and remove tracked dist files from git index

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Validate build pipeline configuration and environment variable contracts before user story tasks.

**⚠️ CRITICAL**: Foundational tasks must be completed before verifying user story functionality.

- [X] T003 Validate Vite build settings and root asset base path in vite.config.js
- [X] T004 [P] Verify environment variable contract mapping in .env.example

**Checkpoint**: Foundation ready - deployment configuration and build scripts are properly grounded.

---

## Phase 3: User Story 1 - Public Portfolio Browsing and Visual Presentation (Priority: P1) 🎯 MVP

**Goal**: Deliver a reliable, fast-loading public portfolio hosted on Render where all graphical assets, styles, and scripts load with proper MIME types and zero browser rejections.

**Independent Test**: Execute `npm run build` locally, verify that `dist/index.html` exclusively references hashed bundle assets (`/assets/index-*.js`) with zero raw `/src/main.jsx` references, and preview the site via `npm run preview`.

- [X] T005 [P] [US1] Run automated test suite with Happy-DOM in src/App.test.jsx
- [X] T006 [US1] Execute production bundle build to generate compiled assets in dist/
- [X] T007 [US1] Validate absence of uncompiled JSX module script tags in dist/index.html
- [X] T008 [US1] Verify local production serving without console errors using npm run preview

**Checkpoint**: User Story 1 is functional and verifiable independently as a Minimum Viable Product.

---

## Phase 4: User Story 2 - Deep Linking and Browser Refresh Navigation (Priority: P2)

**Goal**: Ensure direct URL navigation and browser page refreshes across all portfolio sections load cleanly without 404 or hosting error screens.

**Independent Test**: Verify the rewrite rule (`/*` → `/index.html`, Action: `Rewrite`) is defined in `render.yaml` and documented for Render Dashboard manual configuration.

- [X] T009 [P] [US2] Define SPA catch-all rewrite rule in render.yaml
- [X] T010 [US2] Verify client-side route paths in src/App.jsx against routing contract specs/001-migrate-to-render/contracts/routing-contract.json
- [X] T011 [US2] Document Render Redirects/Rewrites dashboard configuration in README.md

**Checkpoint**: Both User Story 1 and User Story 2 can be verified independently without routing failures.

---

## Phase 5: User Story 3 - Interactive Contact Inquiries and Communication (Priority: P3)

**Goal**: Enable visitors to submit contact messages and pass human-verification checks on Render with secure build-time environment variable injection.

**Independent Test**: Confirm that all required keys from `.env.example` are documented with instructions for Render's Environment settings tab, and verify form submission feedback handling.

- [X] T012 [P] [US3] Verify contact form error handling and missing key warning in src/App.jsx
- [X] T013 [US3] Document Render build-time environment variables configuration in README.md

**Checkpoint**: All three user stories are functionally verified and ready for deployment.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finalize documentation, annotate legacy configurations, and execute end-to-end validation.

- [X] T014 [P] Replace default Vite README template with comprehensive portfolio & Render deployment documentation in README.md
- [X] T015 [P] Annotate Dockerfile and nginx.conf as legacy/local-only container artifacts in Dockerfile
- [X] T016 Execute quickstart end-to-end validation checklist from specs/001-migrate-to-render/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1: Setup (T001, T002)
       │
       ▼
Phase 2: Foundational (T003, T004)
       │
       ├───────────────────────────────────────┐
       ▼                                       ▼
Phase 3: User Story 1 (P1 MVP)          Phase 4: User Story 2 (P2)
(T005 ─► T006 ─► T007 ─► T008)          (T009 ─► T010 ─► T011)
       │                                       │
       └──────────────────┬────────────────────┘
                          ▼
               Phase 5: User Story 3 (P3)
               (T012 ─► T013)
                          │
                          ▼
               Phase 6: Polish (T014, T015, T016)
```

- **Setup (Phase 1)**: Can begin immediately.
- **Foundational (Phase 2)**: Depends on Setup completion; blocks all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational phase completion. User stories can proceed sequentially in priority order (P1 → P2 → P3) or in parallel.
- **Polish (Phase 6)**: Executes after all story tasks are complete.

### User Story Dependencies

- **User Story 1 (P1)**: Independent of US2 and US3. Can deploy as a standalone MVP.
- **User Story 2 (P2)**: Independent of US3. Builds upon static serving from US1.
- **User Story 3 (P3)**: Relies on US1 page rendering, but form logic is isolated.

---

## Parallel Execution Examples

### Parallel Opportunities in Setup & Foundation
```bash
# Run in parallel:
Task T001: "Create Render blueprint configuration in render.yaml"
Task T002: "Clean up build artifact tracking in .gitignore and remove tracked dist files from git index"
Task T004: "Verify environment variable contract mapping in .env.example"
```

### Parallel Opportunities Across User Stories
```bash
# After Phase 2 completes, these can run in parallel:
Task T005: "[US1] Run automated test suite with Happy-DOM in src/App.test.jsx"
Task T009: "[US2] Define SPA catch-all rewrite rule in render.yaml"
Task T012: "[US3] Verify contact form error handling and missing key warning in src/App.jsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Phase 1 (Setup: `render.yaml`, `.gitignore`).
2. Complete Phase 2 (Foundational: `vite.config.js`, `.env.example`).
3. Complete Phase 3 (User Story 1: tests, build, bundle verification).
4. **Deploy & Validate**: Push/merge to `main` branch to trigger Render's automated deployment. Validate that the portfolio loads at the Render URL without MIME-type rejections.

### Incremental Delivery
1. Foundation + US1 = Working public website (MVP).
2. US2 = Robust routing on page refreshes and direct links.
3. US3 = Interactive contact forms and reCAPTCHA verification.
4. Polish = Complete README documentation and legacy cleanup.
