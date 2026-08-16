# Yasirah Mohamed Ilyas — Recruiter-First Chemical Engineering Portfolio

This version is intentionally built as a **one-page recruiter-first portfolio** with one detailed technical case study.

## Why the structure changed
Recruiters may only spend a short time on a portfolio. The homepage therefore contains the important story without requiring them to click through many pages:

1. Hook + identity
2. Interactive lithium-recovery process visual
3. Recruiter snapshot
4. Flagship senior design project
5. Compact coursework snapshots
6. Borouge industrial experience
7. Leadership
8. Technical toolkit
9. Short about section
10. Contact

Only the flagship lithium project gets a detailed case-study page.

## Run locally
Open a terminal in this folder and run:

```powershell
py -m http.server 5500
```

Then open:

`http://localhost:5500`

No npm, Node, React or build step is required.

## Important files
- `index.html` — recruiter-first homepage
- `projects/lithium-recovery.html` — detailed flagship case study
- `css/style.css` — all layout, colors, responsive design and CSS 3D process styling
- `js/script.js` — mobile menu, scroll reveal, process-unit callouts and subtle 3D tilt
- `assets/cv.pdf` — replace this file with your newest CV while keeping the same filename
- `assets/documents/lithium-recovery-poster.pdf` — senior design poster
- `assets/images/projects/` — project visuals

## Replace the CV
Export the new CV as a PDF, rename it exactly `cv.pdf`, and replace:

`assets/cv.pdf`

## Edit colors
At the top of `css/style.css`, change the variables under `:root`.

The main palette is:
- Background: `#071017`
- Panel: `#0e1a23`
- Accent yellow: `#f2b514`
- Process-flow lime: `#b8e238`
- Main text: `#f5f5ef`

## Edit the 3D process flow
The process units are in both `index.html` and `projects/lithium-recovery.html` inside:

`<div class="process-stage" ...>`

The 3D shapes are built entirely with HTML/CSS, so they work locally and do not depend on external libraries.

## Deployment
This is a static website. It can be hosted directly with GitHub Pages, Netlify, Vercel, or any static host.
