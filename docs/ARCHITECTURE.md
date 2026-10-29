# Architecture

Portfolio (home page + one page per project): Vite + React + TypeScript, plain CSS, deployed on Vercel.
Runtime deps: `react`, `react-dom`, `react-router`, `react-markdown`. Everything else is dev tooling.

## Layout
- `src/data/profile.ts`: name, tagline, bio, links. Edit personal text here.
- `src/data/projects.ts`: the `Project` type and the project list. Edit to add/remove projects.
- `src/data/skills.ts`: skill groups shown in the Skills section.
- `src/components/ProjectCard.tsx`: project card on the home page.
- `src/components/Readme.tsx`: fetches the repo README from GitHub and renders it (screens ≥1000px only). Needs `react-markdown`.
- `src/components/ProjectPage.tsx`: the page at `/projects/<slug>`.
- `src/App.tsx`: defines the routes (`/` and `/projects/:slug`) and scrolls to `#section` links.
- `src/styles.css`: all styling. Colors/fonts are CSS variables at the top (`:root`).

## Common tasks
- **Add a project:** add an object to `projects` in `src/data/projects.ts`. Its page appears at `/projects/<repo-name-lowercase>`. Optional media: `video` (mp4/webm) and `images` (png/jpg/gif); put files in `public/projects/<slug>/` and reference them as `/projects/<slug>/file`. Placeholders show until set. Add `details: ["paragraph", ...]` for the write-up.
- **Change colors:** edit the variables in `:root` in `src/styles.css`.
- **Run locally:** `npm install`, then `npm run dev`.
- **Check before pushing:** `npm run build` (type-checks and builds).

## Deploy
- `vercel.json` rewrites every path to `index.html` so direct project URLs work.
- `main` = production, `dev` = preview. Vercel builds every push (`vite build` → `dist`).
- Work on `dev`, check the preview URL, merge to `main` to go live.
