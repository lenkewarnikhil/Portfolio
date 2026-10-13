# Data Model: Portfolio Sections & UX Optimization

**Feature**: Portfolio Sections & UX Optimization (`002-optimize-portfolio-sections`)  
**Date**: 2026-10-14  

---

## Entities

### 1. Project Entity (`Project`)

Represents a showcase project displayed in the portfolio.

| Field | Type | Required | Description | Constraints |
| :--- | :--- | :--- | :--- | :--- |
| `id` | number | Yes | Unique project identifier | Positive integer |
| `title` | string | Yes | Project title | Non-empty string |
| `tagline` | string | Yes | High-level summary tagline | Short phrase |
| `category` | string | Yes | Primary domain classification | `backend`, `ai`, `cloud`, or `research` |
| `description` | string | Yes | Brief problem-solution summary | Max 250 characters |
| `longDescription` | string | No | Extended technical description | Optional |
| `tags` | Array<string> | Yes | High-level topic badges | E.g. `["Python", "LLM", "Security"]` |
| `technologies` | Array<string> | Yes | Specific tools/libraries used | E.g. `["FastAPI", "Docker", "React"]` |
| `year` | number | Yes | Year completed or launched | 4-digit year |
| `status` | string | Yes | Lifecycle status badge | E.g. `Completed`, `Active Development`, `Published` |
| `highlights` | Array<string> | Yes | Key technical achievements | Bullet list of metrics/features |
| `link` | string | Yes | Primary external destination | Valid URL (Demo, App, or Paper) |
| `github` | string | No | Source code repository | Valid URL (or null if private/confidential) |

---

### 2. Article Post Entity (`Post`)

Represents a technical article published on the portfolio blog.

| Field | Type | Required | Description | Constraints |
| :--- | :--- | :--- | :--- | :--- |
| `id` | number | Yes | Unique post identifier | Positive integer |
| `slug` | string | Yes | URL slug matching markdown filename | Lowercase kebab-case, e.g. `dsa-to-dev` |
| `title` | string | Yes | Article headline | Non-empty string |
| `date` | string | Yes | Publication date | ISO 8601 string (`YYYY-MM-DD`) |
| `readTime` | string | Yes | Estimated reading duration | E.g. `5 min read` |
| `excerpt` | string | Yes | Short summary for card view | 1-2 sentences |
| `tags` | Array<string> | Yes | Topic tags | E.g. `["Backend", "Learning"]` |

---

### 3. Visitor UI State (`VisitorState`)

Represents client-side interaction state preserved during the browsing session.

| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `theme` | string | `'dark'` | Current theme mode (`'dark'` or `'light'`) stored in `localStorage` |
| `activeFilter` | string | `'all'` | Selected project category filter (`'all'`, `'backend'`, `'ai'`, `'cloud'`) |
| `activeSection` | string | `'home'` | Currently visible viewport section ID |
| `emailCopied` | boolean | `false` | Transient state for copy-to-clipboard confirmation feedback |
| `menuOpen` | boolean | `false` | Mobile navigation drawer state |

---

### 4. SEO & Social Meta Configuration (`SocialMetadata`)

Represents discovery and open-graph parameters embedded in `index.html`.

| Attribute | Value | Description |
| :--- | :--- | :--- |
| `og:title` | `Lenkewar Nikhil | Software Engineer` | Social card heading |
| `og:description` | `Backend engineer and data systems builder exploring reliable systems, AI platforms, and cloud-native delivery.` | Social card snippet |
| `og:image` | `https://portfolio.onrender.com/assets/hero-illustration.png` | Social card visual preview |
| `og:type` | `website` | OpenGraph object type |
| `twitter:card`| `summary_large_image` | Twitter visual layout style |
| `JSON-LD` | Schema `Person` payload | Structured data for search engine rich snippets |
