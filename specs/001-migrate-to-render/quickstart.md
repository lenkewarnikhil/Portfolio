# Quickstart Validation Guide: Portfolio Render Deployment

**Feature**: Migration to Render Hosting (`001-migrate-to-render`)  
**Date**: 2026-10-14  

---

## Prerequisites

- Node.js (v18 or higher) & npm installed locally.
- Git repository connected to your GitHub or GitLab account.
- Free Render account at [render.com](https://render.com).

---

## 1. Local Production Build Validation

Before deploying to Render, verify that the local build succeeds and produces standard static assets in `dist/`.

### Run Test Suite & Build

```bash
# 1. Run unit tests
npm test

# 2. Build production assets
npm run build
```

### Verification Checks

1. **Verify output directory exists**:
   ```bash
   ls -la dist/
   ```
   **Expected**: `dist/` contains `index.html`, `assets/`, `favicon.svg`, `robots.txt`, and `sitemap.xml`.

2. **Verify MIME Type safety in `dist/index.html`**:
   ```bash
   grep "<script type=\"module\"" dist/index.html
   ```
   **Expected**: Shows script paths pointing to `/assets/index-*.js`. It must **NOT** contain `/src/main.jsx`.

3. **Preview production build locally**:
   ```bash
   npm run preview
   ```
   Open `http://localhost:4173` in a browser. Verify all icons, images, and pages load cleanly without console errors.

---

## 2. Render Deployment Options

### Option A: 1-Click Infrastructure as Code (`render.yaml`)

1. Ensure [`render.yaml`](file:///Users/nikhil/Desktop/Portfolio/render.yaml) exists in the repository root.
2. In the Render Dashboard, click **New +** → **Blueprint**.
3. Select your portfolio GitHub repository.
4. Render automatically parses `render.yaml` and configures:
   - **Service Name:** `portfolio`
   - **Type:** Static Site
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
   - **Rewrite Rule:** `/*` → `/index.html` (Rewrite)
5. Add your environment variables under the **Environment** section (see Section 3 below).
6. Click **Apply**.

---

### Option B: Manual Setup via Render Dashboard

If configuring manually without a Blueprint:
1. Go to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** → **Static Site**.
3. Connect your repository.
4. Fill in the required fields:
   - **Name:** `portfolio` (or your choice)
   - **Branch:** `main` (or your active branch)
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Click **Create Static Site**.
6. Immediately navigate to **Redirects/Rewrites** in the left sidebar:
   - Click **Add Rule**
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Action:** `Rewrite`
   - Click **Save Changes**.

---

## 3. Environment Variables Configuration

In Render Dashboard → your service → **Environment**, add the keys from [.env.example](file:///Users/nikhil/Desktop/Portfolio/.env.example):

| Key | Description | Example Value |
| :--- | :--- | :--- |
| `VITE_EMAIL` | Contact display email | `nikhil@example.com` |
| `VITE_LINKEDIN_URL` | Profile URL | `https://linkedin.com/in/...` |
| `VITE_GITHUB_URL` | Profile URL | `https://github.com/...` |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS Service | `service_xxxxxxx` |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS Template | `template_xxxxxxx` |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS Public Key | `xxxxxxx` |
| `VITE_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v2 Key | `6Lc...` |

> **Note:** Because Vite inlines `VITE_*` keys at build time, any changes to environment variables in Render require triggering a rebuild via **Manual Deploy** → **Clear build cache & deploy**.

---

## 4. End-to-End Production Verification Checklist

Once Render marks the deployment **Live**:

- [ ] **Home Page Load**: Open the `.onrender.com` URL. Verify all typography, styles, and hero illustrations render.
- [ ] **Console Audit**: Open Chrome/Firefox DevTools Console (`F12`). Confirm **0** `MIME type of "binary/octet-stream"` or script loading errors.
- [ ] **Page Refresh / Deep Linking**: Navigate to `/projects` or `/about` and press browser refresh (`Cmd+R` / `F5`). Confirm the page renders without a 404 or missing page error.
- [ ] **Contact Form Submission**: Navigate to `/contact`, fill in test data, solve the reCAPTCHA challenge, and click Send. Confirm success notification displays.
- [ ] **SSL/TLS Certificate**: Confirm the padlock icon in the browser address bar is active and valid.
