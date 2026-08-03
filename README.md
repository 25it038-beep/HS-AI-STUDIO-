# HS AI Solutions — Landing Page

A world-class, dark-themed product landing page for the **HS AI Solutions** ecosystem — a growing collection of AI-powered products (AIShield, CareerAI, HS AI Assistant, AI Application Builder).

## Features

- Dark theme with aurora gradients, floating particles, constellation grid, and interactive cursor glow
- Animated 3D visualization (Three.js) in the hero
- Glassmorphism "AI Shelf" with live product cards and launch links
- In-development product card with direct installer download (HS CODE)
- Premium animations (Framer Motion), magnetic buttons, mouse-tilt cards
- SEO: sitemap, robots.txt, web app manifest, Open Graph metadata

## Tech Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · GSAP · Three.js · React Three Fiber

## Requirements

- Node.js 20.9+ (LTS)
- npm (see `requirements.txt` for the full dependency list)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Preview

The project builds to a fully static site (`out/`) — deployable on any static host.

```bash
npm run build      # static build -> out/
npm run start      # serve the built site locally
npm run lint       # ESLint check
```

## Downloadable Assets

- Installer: `public/downloads/HS CODE_0.1.0_x64-setup.exe`
- Logo: `public/logo.jpeg`

## Deployment

### Vercel (recommended)

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — the included `vercel.json` configures everything automatically.
3. Deploy. Live URL: `https://hs-ai-solutions.vercel.app`.

### Render / Netlify / GitHub Pages (static hosting)

- Build command: `npm run build`
- Output directory: `out`
- `next.config.ts` already uses `output: "export"` — no further config needed.

### Environment Variables

Copy `.env.example` to `.env.local` if you need overrides. No secrets are required for the landing page.

## Customization

- Product cards & links: `src/components/SolutionsShelf.tsx`
- Social links (GitHub / LinkedIn / Portfolio / Email): `src/components/FooterSection.tsx`
- Colors & glass styles: `src/app/globals.css`
- Metadata / SEO: `src/app/layout.tsx`

## License

© 2026 Harshan Seliyan B.S. All rights reserved.
