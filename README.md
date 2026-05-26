# React Learn

React Learn is a complete React learning dashboard. It explains React step by step with theory, code examples, command references, and local progress tracking.

The goal is simple: make React understandable from the first idea to real-world app development without leaving gaps.

## Features

- Complete React course from foundations to production topics
- Chapter sidebar with search
- Theory, code, and command sections
- Quizzes and exercise checkpoints for every chapter
- Step-by-step final project guidance
- Progress tracking with `localStorage`
- Continue and reset progress controls
- Topic tags and full-content search
- Shareable chapter URLs like `/chapter/state-decisions`
- Interactive quiz scoring and answer review
- Saved exercise checklist progress
- Progress export/import backups
- Responsive Vite + React interface
- Social preview image for sharing
- Production build ready

## Topics Covered

- Web foundations: HTML, CSS, and JavaScript
- Vite setup and npm commands
- JSX, components, props, and children
- State, events, forms, lists, and keys
- Conditional rendering and effects
- Data fetching, styling, refs, and context
- Routing, custom hooks, performance, debugging, testing, and deployment
- State decisions, effects, architecture, accessibility, production safety, and interview prep
- Code-reading practice, terminal troubleshooting, checkpoints, and a final project

## Tech Stack

- React
- Vite
- CSS
- ESLint

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run test
npm run lint
npm run build
```

## Deployment Notes

The app includes `vercel.json` rewrites so direct chapter URLs work on Vercel. After the production URL is final, update the social preview metadata in `index.html` to use the full deployed URL for `og:image` and `twitter:image`.

## Project Structure

```text
src/
  App.jsx
  main.jsx
  data/
    chapters.js
  hooks/
    useProgress.js
  components/
    ChapterView.jsx
    Sidebar.jsx
    Topbar.jsx
    CodeBlock.jsx
    CommandTable.jsx
    TheoryBlock.jsx
```

## Notes

Progress is saved in the browser using `localStorage`, so every learner can mark chapters complete on their own device.
