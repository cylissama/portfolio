# Portfolio Site: Plan

## Decisions
- **Layout:** single-page scroll (Hero, Projects, About, Contact), sticky top nav with anchor links.
- **Stack:** Vite + React + TypeScript. Runtime deps: `react`, `react-dom` only.
- **Styling:** one plain `styles.css`, CSS variables for colors/fonts/spacing. No CSS framework.
- **Content:** projects are a typed array in `src/data/projects.ts`. No CMS, no database, no routing.
- **Hosting:** Vercel free tier, GitHub-linked.

## Structure
```
portfolio-site/
  index.html
  package.json
  vite.config.ts
  public/                 static files (favicon, resume.pdf, project images)
  src/
    main.tsx              mounts <App />
    App.tsx               Header, Hero, Projects, About, Contact, in order
    styles.css            all styling + CSS variables at the top
    data/
      projects.ts         <- edit to add/remove projects
      profile.ts          <- name, bio, links (so App.tsx has no personal text)
    components/
      Header.tsx
      ProjectCard.tsx
  docs/ARCHITECTURE.md    short "how it works / how to update" for future you
```

## How to add a project
1. Drop an image in `public/projects/` (optional).
2. Add an object to the array in `src/data/projects.ts`:
   ```ts
   { title: "…", summary: "…", tags: ["React"], url: "…", repo: "…", image: "/projects/x.png" }
   ```
3. Commit and push. Vercel redeploys.

The `Project` type makes TypeScript flag a missing or misspelled field.

## Branching and deploy
- `main` is production (your Vercel production domain).
- `dev` is the working branch. Vercel gives every push to `dev` a preview URL.
- Flow: work on `dev`, check the preview URL, merge to `main` to go live.
- Vercel setup: import the GitHub repo, keep the defaults (it detects Vite, build `vite build`, output `dist`). No `vercel.json` needed for a single page.

## Build order
1. Scaffold Vite + React + TS, delete the template demo code.
2. Write `profile.ts`, `projects.ts` (with the `Project` type) and placeholder content.
3. Build the sections in `App.tsx` and `ProjectCard`.
4. Style: pick one accent color and one font pairing, make it responsive (CSS grid, one media query), and add `prefers-color-scheme` dark mode via the CSS variables.
5. Push to GitHub, create the `dev` branch, connect Vercel.
6. Write `docs/ARCHITECTURE.md` (content of this file, trimmed).

## Left out on purpose
- Router, state library, UI kit, Tailwind, Next.js, blog/MDX, contact form backend, analytics.
- Add a `mailto:` link instead of a form. Add routing only if you later want per-project case-study pages.

## Open items (need your input before step 3)
- Name / tagline / bio text, and links (GitHub, LinkedIn, email).
- Visual direction: dark or light default, accent color, font (default: system font stack, no font download).
- 2–4 real projects to seed the list.
