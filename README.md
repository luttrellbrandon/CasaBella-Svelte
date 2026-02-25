# CasaBella-Svelte

SvelteKit site for [Casa Bella HOA](https://casabellahoa.net/), built with Vite, Tailwind, DaisyUI, and deployed to Cloudflare Pages.

## Setup

```bash
npm install
npm run dev
```

- **Build:** `npm run build`
- **Preview production build:** `npm run preview`

## Tech stack

- **SvelteKit** (Vite)
- **@sveltejs/adapter-cloudflare** for Cloudflare Pages
- **Tailwind CSS v4** + **DaisyUI**
- **Light CMS:** Editable content in `src/lib/content/*.ts` (no database; edit files and redeploy)

## Project structure

- `src/lib/content/` — Data for board, documents, links, listings, site copy. Edit these to update content.
- `src/lib/components/` — Reusable UI (Header, Footer, etc.).
- `src/lib/styles/app.css` — Tailwind + DaisyUI entry.
- `static/images/` — Site images (e.g. migrated from the static site repo).
- `static/documents/` — PDFs and other static documents (HOA forms, etc.).

## Deploying to Cloudflare Pages

1. **Build command:** `npm run build`
2. **Build output directory:** `.svelte-kit/cloudflare`
3. Configure the project in the Cloudflare dashboard or use `wrangler.toml` (included).

## Migration from the existing static site

Content and assets for the current [casabellahoa.net](https://casabellahoa.net/) site live in the [CasaBella](https://github.com/luttrellbrandon/CasaBella) repo (WordPress exported to static).

- **Images:** Copy from `Pictures/` and, if needed, `CasaBella_Static/wp-content/uploads/` into `static/images/`.
- **Documents:** Copy any linked PDFs or docs into `static/documents/` and set the paths in `src/lib/content/documents.ts`.
- **Content:** Board, documents, links, and listings are already seeded in `src/lib/content/` from the live site. Adjust or add entries as needed.

After copying assets, update `src/lib/content/documents.ts` (and any image references in components) to use paths like `/images/...` and `/documents/...`.
