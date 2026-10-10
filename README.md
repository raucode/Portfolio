# Raúl Figuera · Portfolio

Dark technical portfolio in Spanish, English and Portuguese. The homepage features Sauron, Second Brain and Hackaton; “View more” expands the additional projects. Includes a self-hosted infrastructure section, AI-assisted development with Codex and Claude, and a printable resume.

## Development and build

Use Node.js 20.19+ or 22.12+ and the existing Yarn lockfile:

```sh
corepack yarn install --immutable
yarn dev
yarn build
```

The static production output is `dist/`. The retained `vercel.json` rewrites `/resume` to the application. For another static host, configure the same fallback to `index.html` and serve assets normally.

## Standalone HTML

After building, export the same React application with embedded images, CSS and JavaScript:

```sh
node scripts/export-html.mjs /absolute/path/portafolio.html
```

The file opens directly without a server. It uses an in-memory router on `file://`, so the resume works there too. Google Analytics is preserved in the hosted version and excluded from the portable artifact.

## Content

- `src/content/site/`: profile, about, stack, contact and CV in three languages.
- `src/content/projects/`: one JSON file per project. `featured: true` selects the three main cards; `order` controls catalog order.
- `public/project_preview/`: screenshots. Views using sample data are explicitly labelled.
- `src/locales/portfolio.js`: interface copy.
- `src/styles/portfolio.css`: the selected dark technical design.
- [Project evidence and curation](docs/PROJECTS.md).

## Main-server hosting

Deployment target: `/home/raul/portfolio` on `main-server`, served at `http://192.168.18.10:8102`. See [deployment instructions](deployment/README.md).

## Domain

Canonical URL, sitemap and metadata target `https://www.raulabz.online/`. Public HTTPS at `https://www.raulabz.online/` was verified on 2026-10-10 after Raul connected the domain. The origin remains `http://192.168.18.10:8102` on `main-server`.

## Verification

Production build and browser checks passed for the React build and standalone HTML: ES/EN/PT, 1440/390/320px, three cards initially and thirteen expanded, mobile navigation and Escape, project details, resume navigation and PDF printing. Evidence is stored outside the public repository in `Documentos/Portfolio-2026-10-10/evidence/`.
