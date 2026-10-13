# Implementation Plan: Portfolio Sections & User Experience Optimization

**Branch**: `002-optimize-portfolio-sections` | **Date**: 2026-10-14 | **Spec**: [specs/002-optimize-portfolio-sections/spec.md](spec.md)

**Input**: Feature specification from `specs/002-optimize-portfolio-sections/spec.md`

## Summary

Implement comprehensive section-by-section optimizations across the portfolio:
1. **Interactive Project Discovery**: Add client-side domain filtering (`All`, `Backend & APIs`, `AI & LLMs`, `Cloud & Infrastructure`), dedicated repository/live links, and enhanced impact summaries.
2. **Article Reader Parity**: Synchronize dark/light theme persistence between the portfolio and blog reader ([`src/Blog.jsx`](file:///Users/nikhil/Desktop/Portfolio/src/Blog.jsx)), format technical code blocks (`pre code`) with readable contrast, and add estimated read-time badges.
3. **Recruiter Quick-Actions**: Introduce 1-click clipboard email copying with feedback toasts, an active availability indicator (`● Available for Opportunities`), and dual hero CTA buttons.
4. **Core Web Vitals, Accessibility & SEO**: Implement an accessible "Skip to content" keyboard link, explicit image dimensions with lazy loading, and OpenGraph/JSON-LD search discovery metadata in `index.html`.

## Technical Context

**Language/Version**: Node.js 20.x, JavaScript (ESModules)  
**Primary Dependencies**: React 19, React Router 7 (`react-router-dom`), Marked (`marked`), DOMPurify (`dompurify`), EmailJS (`@emailjs/browser`), Vite 8  
**Storage**: Client `localStorage` (theme persistence) and local JSON data (`src/data/projects.json`, `profile.json`, `blog-posts.json`)  
**Testing**: Vitest 5 (`vitest run`, `@testing-library/react`, `happy-dom`)  
**Target Platform**: Render Static Site (Edge CDN, Automated HTTPS)  
**Project Type**: Single Page Web Application (SPA)  
**Performance Goals**: Category filtering execution < 100ms; Initial page load < 2.5s; CLS < 0.05; Accessibility audit score 95+  
**Constraints**: Pure client-side static bundle; Zero runtime backend server required; High contrast dark/light themes meeting WCAG 2.1 AA  
**Scale/Scope**: 1 web application codebase, 4 primary user stories, updated content data files, cross-page visual consistency  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Simplicity**: PASS. All filtering and theme state utilize lightweight React state and browser native APIs (`navigator.clipboard`, `localStorage`) without adding heavy runtime dependencies.
- **Test-First**: PASS. Component rendering and filter transitions will be verified via Vitest unit tests in `src/App.test.jsx`.
- **Accessibility & Standards**: PASS. Introduces skip-links, semantic ARIA labels, and WCAG-compliant color contrast across both themes.

## Project Structure

### Documentation (this feature)

```text
specs/002-optimize-portfolio-sections/
├── spec.md              # Feature specification
├── plan.md              # This implementation plan
├── research.md          # Phase 0 technical decisions & architecture
├── data-model.md        # Phase 1 data entities and attributes
├── quickstart.md        # Phase 1 test and verification runbook
├── contracts/
│   ├── project-schema.json    # JSON schema for projects.json
│   └── metadata-contract.json # HTML SEO & OpenGraph contract
└── checklists/
    └── requirements.md  # Requirements quality checklist
```

### Source Code (repository root)

```text
src/
├── App.jsx              # Main page: category filtering, copy email, availability badge, hero CTAs
├── Blog.jsx             # Article reader: theme toggle, code styling, metadata display
├── App.test.jsx         # Unit tests covering rendering and interactions
├── css/
│   └── main.css         # Styling: filter buttons, code blocks, copy toast, skip-link, badges
├── data/
│   ├── projects.json    # Enhanced with category tags and repo links
│   ├── profile.json     # Personal details & availability status
│   └── blog-posts.json  # Article metadata
index.html               # Enhanced with OpenGraph meta tags, Twitter card, JSON-LD Schema
```

**Structure Decision**: Keep the existing lightweight component layout. Enhance existing components ([`src/App.jsx`](file:///Users/nikhil/Desktop/Portfolio/src/App.jsx), [`src/Blog.jsx`](file:///Users/nikhil/Desktop/Portfolio/src/Blog.jsx)), update stylesheets ([`src/css/main.css`](file:///Users/nikhil/Desktop/Portfolio/src/css/main.css)), and enrich data models ([`src/data/projects.json`](file:///Users/nikhil/Desktop/Portfolio/src/data/projects.json)).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| :--- | :--- | :--- |
| None | N/A | Utilizes existing React hooks, browser APIs, and CSS variables with 0 added dependencies. |
