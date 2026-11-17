# EditBridge — Find the Right Video Editor

Frontend marketplace prototype that connects brands and content creators with professional video editors. Built with React + Vite + TypeScript + Tailwind CSS v4.

## Tech stack
- React 19
- Vite 8
- TypeScript
- Tailwind CSS v4
- lucide-react (icons)

## Project structure
```
src/
  App.tsx
  index.css
  main.tsx
  components/
    Top.tsx            (Navbar, Hero, Stats)
    Marketplace.tsx    (Editor list + filters)
    AiMatch.tsx        (AI Smart Match simulation)
    Sections.tsx       (Client case, Steps, Dashboard preview, CTA, Footer)
    PostProjectModal.tsx
  data/
    editors.ts
e2e/tests/smoke.spec.ts   (Playwright E2E)
```

## Run the project
```bash
npm install
npm run dev
```
Open http://localhost:5199

## Build
```bash
npm run build
npm run preview
```

## Lint
```bash
npm run lint
```

## Tests
```bash
npx playwright test
```

## Notes
- Frontend only: no backend, database, API integration, real AI, auth, or dynamic dashboard.
- The dashboard is a static preview; "Post a Project" opens the request modal.