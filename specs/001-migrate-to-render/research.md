# Phase 0 Research: Migration from Railway to Render Hosting

**Feature**: Migration to Render Hosting (`001-migrate-to-render`)  
**Date**: 2026-10-14  

---

## 1. Hosting Tier Selection: Render Static Site vs. Render Web Service (Docker)

### Decision
Deploy the portfolio as a **Render Static Site** (`env: static`), driven directly by Node.js build commands (`npm run build`) and serving the compiled `dist/` directory.

### Rationale
- **Zero Compute / Zero Cost Overhead:** The portfolio is purely client-side (React 19 + Vite 8). A static site on Render incurs zero compute hours and is permanently free.
- **Performance & Global CDN:** Render Static Sites are served directly from Render's global CDN edge network, providing low latency and fast caching for assets, whereas a Docker web service requires a persistent container instance.
- **Simplified Lifecycle:** Eliminates the Docker daemon build step, container image pulling, Alpine Linux dependencies, and Nginx reverse proxy configuration.

### Alternatives Considered
- **Render Web Service (Docker using existing `Dockerfile` + `nginx.conf`):**  
  *Evaluated:* Reusing the existing Railway container setup.  
  *Rejected because:* Render's free Web Service tier spins down after 15 minutes of inactivity, leading to 50+ second cold-start delays when recruiters or visitors view the portfolio. Static Sites have zero cold starts.
- **Node.js Express Server:**  
  *Rejected because:* Adds unnecessary server maintenance and memory overhead for serving static assets.

---

## 2. SPA Client-Side Routing and Rewrite Rules

### Decision
Implement an explicit SPA rewrite rule on Render:
- **Source:** `/*`
- **Destination:** `/index.html`
- **Action:** `Rewrite`

### Rationale
- The application uses `react-router-dom` for client-side navigation.
- In a Single Page Application (SPA), all route paths (e.g., `/`, `/projects`, `/about`) are resolved by the browser's JavaScript router. When a visitor directly requests or refreshes a sub-route, the host web server must rewrite the request to `/index.html` instead of looking for a non-existent physical folder or returning a 404 HTTP status.

### Alternatives Considered
- **Switch to HashRouter (`/#/projects`):**  
  *Rejected because:* Hash routing produces non-standard URLs that look unprofessional for a portfolio and harm SEO.
- **Static Pre-rendering / SSG:**  
  *Rejected because:* Adds tooling complexity (e.g., Vite SSG or Astro migration) that exceeds the scope of this migration.

---

## 3. Root Cause of MIME Type Error & Prevention

### Decision
Explicitly configure Render's Publish Directory as `dist` and provide an Infrastructure-as-Code `render.yaml` blueprint.

### Rationale
- **Root Cause Analysis:** The error `Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "binary/octet-stream"` occurred because Render served the project root [index.html](file:///Users/nikhil/Desktop/Portfolio/index.html) instead of the built [dist/index.html](file:///Users/nikhil/Desktop/Portfolio/dist/index.html).
- The root `index.html` requests `/src/main.jsx`. Because `.jsx` is not a standardized web MIME type recognized by static file servers, Render delivers it with `Content-Type: binary/octet-stream`. Modern browsers strictly block `<script type="module">` tags with non-JavaScript MIME types.
- Setting `publishDir: dist` ensures Render serves compiled production assets (`/assets/index-*.js`) which Render serves with `Content-Type: application/javascript`.

### Alternatives Considered
- **Manual Dashboard-Only Configuration:**  
  *Rejected as sole solution because:* Manual entry is prone to typographical errors (e.g., leaving publish directory empty or entering `.`). `render.yaml` guarantees deterministic configuration.

---

## 4. Infrastructure-as-Code (Render Blueprint `render.yaml`)

### Decision
Add a root [`render.yaml`](file:///Users/nikhil/Desktop/Portfolio/render.yaml) specification declaring the static service, build command, publish directory, and routing rewrites.

```yaml
services:
  - type: web
    name: portfolio
    runtime: static
    buildCommand: npm run build
    staticPublishPath: dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

### Rationale
- Enables Render Blueprint sync: connecting the Git repository automatically detects the service configuration without requiring manual form entry.
- Documents the hosting infrastructure directly alongside source code.

### Alternatives Considered
- Relying exclusively on manual GUI configuration in Render Dashboard.  
  *Rejected because:* Code-managed infrastructure prevents regressions and simplifies redeployment.

---

## 5. Build-Time Environment Variable Strategy

### Decision
Document and configure required `VITE_*` environment variables in Render's service settings (or `render.yaml` placeholders) for build-time inlining.

### Rationale
- Vite embeds environment variables prefixed with `VITE_` during `npm run build`.
- Unlike container runtime injection (`$PORT`), static sites must have environment variables present *during the build command step*.
- Required variables:
  - `VITE_EMAIL`
  - `VITE_LINKEDIN_URL`, `VITE_GITHUB_URL`, `VITE_TWITTER_URL`, `VITE_REDDIT_URL`
  - `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
  - `VITE_RECAPTCHA_SITE_KEY`

---

## 6. Legacy Configuration Management (Railway, Docker, Nginx)

### Decision
Retain [`Dockerfile`](file:///Users/nikhil/Desktop/Portfolio/Dockerfile) and [`nginx.conf`](file:///Users/nikhil/Desktop/Portfolio/nginx.conf) for local container testing and multi-cloud portability, but update documentation in [`README.md`](file:///Users/nikhil/Desktop/Portfolio/README.md) to establish Render Static Site as the primary production deployment target.

### Rationale
- Preserves local container run capability without breaking existing scripts.
- Prevents confusion by removing outdated Railway-specific setup instructions from the documentation.
