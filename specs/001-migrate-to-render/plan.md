# Implementation Plan: Migration to Render Hosting

**Branch**: `001-migrate-to-render` | **Date**: 2026-10-14 | **Spec**: [specs/001-migrate-to-render/spec.md](spec.md)

**Input**: Feature specification from `specs/001-migrate-to-render/spec.md`

## Summary

Migrate the personal portfolio deployment pipeline from a containerized Railway setup to a Render Static Site tier. The implementation defines an Infrastructure-as-Code blueprint ([`render.yaml`](file:///Users/nikhil/Desktop/Portfolio/render.yaml)) establishing automated Vite compilation (`npm run build`), root SPA rewrite rules (`/*` -> `/index.html`), and build directory publishing (`dist`). This eliminates container cold starts, resolves browser module MIME type errors, and updates project documentation for seamless deployment.

## Technical Context

**Language/Version**: Node.js 20.x, JavaScript (ESModules)  
**Primary Dependencies**: React 19 (`react`, `react-dom`), React Router 7 (`react-router-dom`), Vite 8 (`vite`, `@vitejs/plugin-react`), EmailJS (`@emailjs/browser`), reCAPTCHA (`react-google-recaptcha`)  
**Storage**: N/A (Stateless client-side application)  
**Testing**: Vitest 5 (`vitest run`, `@testing-library/react`, `happy-dom`)  
**Target Platform**: Render Static Site (Global Edge CDN, Automated TLS/SSL)  
**Project Type**: Single Page Web Application (SPA)  
**Performance Goals**: Initial visual render < 2.5s on broadband; 0 MIME type warnings or script rejections; 100% deep-link/refresh success rate  
**Constraints**: Zero idle hosting cost (Render Free Tier); build-time environment variable injection; strict MIME types enforced by modern browsers (`nosniff`)  
**Scale/Scope**: 1 web application repository, 1 production static deployment, automated continuous deployment triggered on Git branch push  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Simplicity**: PASS. Migrating from a multi-stage Docker container + custom Nginx proxy to a native static site host dramatically reduces architecture complexity.
- **Test-First**: PASS. Vitest test suite runs both locally and in CI prior to compilation.
- **Observability & Debuggability**: PASS. Render provides build and request logs; Vite outputs build artifact sizes and chunk maps directly during `npm run build`.

## Project Structure

### Documentation (this feature)

```text
specs/001-migrate-to-render/
├── spec.md              # Feature specification
├── plan.md              # This implementation plan
├── research.md          # Phase 0 research & technology decisions
├── data-model.md        # Phase 1 deployment data model
├── quickstart.md        # Phase 1 validation and verification runbook
├── contracts/
│   ├── render-blueprint.json   # Render infrastructure-as-code schema
│   └── routing-contract.json    # SPA routing & rewrite contract
└── checklists/
    └── requirements.md  # Requirements quality checklist
```

### Source Code (repository root)

```text
/Users/nikhil/Desktop/Portfolio/
├── render.yaml          # Render Blueprint declaration (New)
├── vite.config.js       # Vite configuration with root base
├── package.json         # Build & test scripts (npm run build, npm test)
├── index.html           # Development HTML entry point
├── public/              # Static public assets (favicons, manifests, images)
├── src/
│   ├── main.jsx         # Application entry point
│   ├── App.jsx          # Route declarations & top-level layout
│   └── css/             # Styling & layout definitions
├── dist/                # Production build output directory (publish directory)
│   ├── index.html       # Production compiled HTML with hashed asset scripts
│   └── assets/          # Bundled JS chunks, CSS, and optimized media
├── Dockerfile           # Retained for container portability / local testing
├── nginx.conf           # Retained for containerized reverse-proxy execution
└── README.md            # Updated with Render deployment instructions
```

**Structure Decision**: Retain the existing Single Page Application project structure. Add root-level [`render.yaml`](file:///Users/nikhil/Desktop/Portfolio/render.yaml) for automated Render blueprint synchronization and update [`README.md`](file:///Users/nikhil/Desktop/Portfolio/README.md) to replace Railway instructions with Render deployment guides.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| :--- | :--- | :--- |
| None | N/A | Render Static Site is the simplest and most cost-effective deployment target for a client-side SPA. |
