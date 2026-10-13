# Lenkewar Nikhil | Portfolio Website

Personal portfolio website built with modern web technologies, featuring showcase sections for featured projects, engineering experience, blog posts, and interactive contact forms.

---

## 🛠️ Tech Stack

- **Core:** React 19, React Router 7, Vite 8
- **Testing:** Vitest 5 with Happy-DOM & React Testing Library
- **Form & Security:** EmailJS browser SDK, Google reCAPTCHA v2
- **Hosting:** Render (Static Site with Global Edge CDN)

---

## 🚀 Local Development

### Prerequisites

- Node.js (v18+)
- npm (v9+)

### Setup & Run

```bash
# 1. Clone repository
git clone https://github.com/lenkewarnikhil/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Create environment file from template
cp .env.example .env

# 4. Start local development server
npm run dev
```

Visit `http://localhost:5173` to view the application with hot module replacement (HMR).

### Testing & Verification

```bash
# Run unit test suite
npm test

# Build production assets
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploying to Render

This portfolio is configured to run on **Render Static Sites**. Render provides free edge-CDN hosting with automated HTTPS certificates and continuous deployment.

### Option 1: 1-Click Infrastructure as Code (`render.yaml`)

This repository includes [`render.yaml`](render.yaml).

1. Log into your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** → **Blueprint**.
3. Connect your portfolio repository.
4. Render automatically configures:
   - **Type:** Static Site
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
   - **SPA Rewrite Rule:** `/*` → `/index.html` (Rewrite)
5. Add your environment variables in the **Environment** tab.
6. Click **Apply**.

---

### Option 2: Manual Setup via Render Dashboard

If you created your Static Site manually in the Render dashboard, ensure the following settings are configured:

| Setting | Value | Description |
| :--- | :--- | :--- |
| **Runtime** | `Static` | Free static hosting tier |
| **Build Command** | `npm run build` | Compiles React/JSX into optimized bundles |
| **Publish Directory** | `dist` | **CRITICAL:** Directory served by Render |
| **Branch** | `main` | Branch for automated deployments |

#### ⚠️ 1. Configure Client-Side Routing (Fix 404 on Refresh)
Because this app uses client-side routing (`react-router-dom`), navigating directly to deep links (such as `/blog/:slug`) or refreshing the page will return a 404 unless a rewrite rule is set:
1. Go to your Render service → **Redirects/Rewrites**.
2. Click **Add Rule**:
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Action:** `Rewrite`
3. Click **Save Changes**.

#### ⚠️ 2. Environment Variables Configuration
Vite inlines `VITE_*` environment variables during `npm run build`. Configure the following in your Render service's **Environment** tab:

```text
VITE_EMAIL=nikhil.codes@gmail.com
VITE_LINKEDIN_URL=https://www.linkedin.com/in/lenkewar-nikhil/
VITE_GITHUB_URL=https://github.com/lenkewarnikhil
VITE_TWITTER_URL=https://x.com/lenkewar_nikhil
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxx
VITE_RECAPTCHA_SITE_KEY=6Lc...
```

> **Important:** When updating environment variables on Render, always trigger a **Manual Deploy** → **Clear build cache & deploy** so Vite inlines the new values during the build.

---

### 🔍 Troubleshooting: The MIME-type Error Explained

If you ever see:
> `Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "binary/octet-stream". Strict MIME type checking is enforced for module scripts per HTML spec.`

* **Why it happens:** Render was pointed to the root directory `.` (or publish directory was empty), causing it to serve root `index.html` which requests `/src/main.jsx`. Because `.jsx` is not a standard web file, Render serves it as `binary/octet-stream`, which the browser strictly blocks.
* **The Fix:** Ensure **Publish Directory** is strictly set to `dist`. Render will then serve `dist/index.html` with compiled `/assets/*.js` files delivered with `Content-Type: text/javascript`.

---

## 🐳 Container Testing (Legacy / Portable)

A multi-stage [`Dockerfile`](Dockerfile) and [`nginx.conf`](nginx.conf) are retained in this repository for local containerized testing:

```bash
# Build Docker image
docker build -t portfolio .

# Run Docker container locally
docker run -p 8080:8080 portfolio
```
*(Production deployment runs natively on Render Static Sites without container overhead).*
