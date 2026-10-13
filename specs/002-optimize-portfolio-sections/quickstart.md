# Quickstart Validation Guide: Portfolio Sections & UX Optimization

**Feature**: Portfolio Sections & UX Optimization (`002-optimize-portfolio-sections`)  
**Date**: 2026-10-14  

---

## Prerequisites

- Node.js (v18+) & npm installed.
- Local repository checkout on branch `002-optimize-portfolio-sections`.

---

## 1. Local Development Run

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Run test suite
npm test

# 3. Start development server
npm run dev
```

Open `http://localhost:5173` in a desktop and mobile viewport emulator.

---

## 2. Interactive Feature Validation Scenarios

### Scenario A: Project Showcase Filtering (US1)
1. Navigate to the **#projects** section.
2. Observe the category filter bar: `All`, `Backend & APIs`, `AI & LLMs`, `Cloud & Infrastructure`.
3. Click `AI & LLMs`:
   - **Expected**: Instantly filters to show AI-Onboarder. Card shows problem statement, tools used, and links.
4. Click `Cloud & Infrastructure`:
   - **Expected**: Instantly filters to show Nikhil's Cloud.
5. Click `All`:
   - **Expected**: All 4 projects re-appear immediately with no page reloads.

### Scenario B: Article Reader Theme & Code Formatting (US2)
1. On the home page, switch the theme to **Dark Mode** using the theme toggle in the header.
2. Scroll to the **#blog** section and click "Read the blog" on any article (e.g. `/blog/dsa-to-dev` or `/blog/ai`).
3. **Verify**:
   - The article page renders in Dark Mode matching the homepage preference.
   - The article header displays a theme toggle button that can switch between Dark and Light mode.
   - Any code blocks (`pre code`) display with monospaced font, dark contrast background, and horizontal scrolling without clipping.
   - Click "Back to all blogs" → Smoothly returns to the home page's blog section.

### Scenario C: Recruiter Quick Actions & Availability (US3)
1. Scroll to the Hero section:
   - **Verify**: The availability badge displays `● Available for Opportunities` (or similar status).
   - **Verify**: Dual CTA buttons (`View Projects` and `Download CV`) are accessible.
2. In the Hero or Contact section, click the "Copy Email" button:
   - **Verify**: Text changes to "Copied!" for 2 seconds and your email (`nikhil.codes@gmail.com`) is copied to the system clipboard.
3. Test Contact Form Validation:
   - Submit with empty inputs → Native/accessible validation guides the user.

### Scenario D: Accessibility & SEO Verification (US4)
1. **Keyboard Accessibility**:
   - Reload `http://localhost:5173` and press `Tab`:
   - **Verify**: A visible "Skip to main content" link appears at the top left. Pressing `Enter` jumps directly to `#home`.
2. **SEO & Social Metadata**:
   - Inspect page source (`curl -s http://localhost:5173/ | grep -E "(og:|twitter:|schema.org)"` or view page source in browser).
   - **Verify**: OpenGraph tags and JSON-LD structured data for `Person` are present in `<head>`.

---

## 3. Production Build & Preview Verification

```bash
# 1. Compile production bundle
npm run build

# 2. Preview production build
npm run preview
```

Open `http://localhost:4173`:
- Confirm 0 console errors or warnings.
- Confirm all images load cleanly with zero layout shift.
