# Portfolio — Project Manager & SQA

Next.js 16 (App Router, Turbopack) · Tailwind CSS v4 · Motion · Lenis · next-themes · lucide-react

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Make it yours

All content lives in `src/data/profile.ts` — name, role, metrics, experience (changelog), projects (tickets),
process, tools, certifications, testimonials and contact links. Edit that file; no component changes needed.

- Add `public/resume.pdf` for the Résumé button.
- To show a photo on the About badge, replace the initials block in `src/components/About.tsx` with `next/image`.
- Colors are CSS tokens at the top of `src/app/globals.css` (light + `.dark`).
- The contact form has no backend: it opens the visitor's mail client with a pre-filled email.
