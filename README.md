# HS AI Solutions — AI on Board

The product site for the **HS AI Solutions** ecosystem — a curated collection of AI products built end-to-end: from research to deployed apps.

## Products

| # | Product | Status | URL |
|---|---------|--------|-----|
| 01 | Lumina — AI Presentation Generator | Live | https://lumina-pghe.onrender.com/ |
| 02 | HSBot — Multi-Model AI Workspace | Live | https://hs-chatbot-3.onrender.com/ |
| 03 | Ledger — Digital Identity Platform | Live | https://ledger-1-2ttx.onrender.com/ |
| 04 | Phishing Defence — AI Link Protection | Live | https://efinal-ok77.vercel.app/ |
| 05 | HS CODE — AI Code Companion (desktop) | In development | Download in `public/downloads/hs-code-setup.exe` |

## Features

- Dark cinematic landing page: 12 sections (hero, featured, multi-model, digital identity, security, all applications, ecosystem, building in public, final CTA, …)
- Product detail pages for every product (`/products/{id}`, statically generated)
- Live demo videos (screen recordings) embedded in-page
- Desktop installer download with an "In development" status
- Framer Motion animations, magnetic buttons, canvas particle hero, SVG ecosystem graph
- Fully responsive, reduced-motion support

## Tech Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build & Checks

```bash
npm run lint   # ESLint
npm run build  # production build
npm run start  # serve the production build
```

## Content

All product data lives in a single registry: `src/data/products.ts`. Adding a product = one object (metadata, accent color, features, flow, capabilities, use cases, preview key).

## Contact

- LinkedIn: https://www.linkedin.com/in/harshan-seliyan-b-s-5339b4282
- Email: harshanseliyan28@gmail.com

© 2026 Harshan Seliyan B.S. All rights reserved.
