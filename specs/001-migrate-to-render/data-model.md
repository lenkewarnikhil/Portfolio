# Data Model: Migration to Render Hosting

**Feature**: Migration to Render Hosting (`001-migrate-to-render`)  
**Date**: 2026-10-14  

---

## Entities

### 1. Platform Deployment Configuration

Represents the deployment parameters and build pipeline instructions defined for Render.

| Field | Type | Required | Description | Validation / Constraints |
| :--- | :--- | :--- | :--- | :--- |
| `name` | string | Yes | Name of the hosted service | Lowercase alphanumeric, hyphens allowed (e.g. `portfolio`) |
| `type` | string | Yes | Service tier | Must be `web` |
| `runtime` | string | Yes | Environment type | Must be `static` |
| `buildCommand` | string | Yes | Command executed to produce production bundle | Must be `npm run build` |
| `staticPublishPath` | string | Yes | Output directory containing production assets | Must be `dist` |
| `routes` | Array<RouteRule> | Yes | URL rewrite/redirect rules | Must contain root SPA rewrite rule |
| `envVars` | Array<EnvVarEntry> | No | Build-time environment variable declarations | Must map required `VITE_*` keys |

#### Relationships
- Has many `RouteRule` entities.
- Has many `EnvVarEntry` entities.

---

### 2. Route Rule (`RouteRule`)

Represents server-side URL routing and redirection behaviors on the hosting platform.

| Field | Type | Required | Description | Validation / Constraints |
| :--- | :--- | :--- | :--- | :--- |
| `type` | string | Yes | Action applied to matching incoming requests | Allowed: `rewrite`, `redirect` |
| `source` | string | Yes | Request path pattern matching rule | Standard glob pattern, e.g. `/*` |
| `destination` | string | Yes | Target path served for matched requests | Must resolve to existing asset, e.g. `/index.html` |

#### State & Rules
- For SPA client-side routing, the primary rule is: `type: rewrite`, `source: /*`, `destination: /index.html`.

---

### 3. Environment Variable Entry (`EnvVarEntry`)

Represents environment parameters provided to the build process.

| Field | Type | Required | Description | Sensitive |
| :--- | :--- | :--- | :--- | :--- |
| `VITE_EMAIL` | string | No | Owner contact address displayed in portfolio | No |
| `VITE_LINKEDIN_URL` | string | No | Link to LinkedIn profile | No |
| `VITE_GITHUB_URL` | string | No | Link to GitHub profile | No |
| `VITE_TWITTER_URL` | string | No | Link to Twitter/X profile | No |
| `VITE_REDDIT_URL` | string | No | Link to Reddit profile | No |
| `VITE_EMAILJS_SERVICE_ID` | string | Yes | Service identifier for EmailJS client API | Yes |
| `VITE_EMAILJS_TEMPLATE_ID` | string | Yes | Template identifier for email dispatch | Yes |
| `VITE_EMAILJS_PUBLIC_KEY` | string | Yes | Public authentication key for EmailJS client | Yes |
| `VITE_RECAPTCHA_SITE_KEY` | string | Yes | Public key for Google reCAPTCHA v2 verification | Yes |

---

### 4. Visitor Session

Represents an active client interaction within the browser.

| Field | Type | Description |
| :--- | :--- | :--- |
| `currentRoute` | string | Active path navigated by the visitor (e.g., `/`, `/projects`, `/about`, `/contact`) |
| `theme` | string | Active color scheme preference (`light` or `dark`) |
| `networkStatus` | string | Current connectivity state (`online` or `offline`) |

---

### 5. Contact Submission

Represents an inquiry submitted through the portfolio contact form.

| Field | Type | Required | Description | Validation |
| :--- | :--- | :--- | :--- | :--- |
| `name` | string | Yes | Sender's full name | Non-empty, trimmed, min 2 chars |
| `email` | string | Yes | Sender's return email address | Valid email format |
| `message` | string | Yes | Message text body | Non-empty, min 10 chars |
| `recaptchaToken` | string | Yes | Verification response token | Must be valid non-expired token |
| `status` | string | Yes | Lifecycle status | `idle` → `submitting` → `success` / `error` |
