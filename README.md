# Financial Transparency Coalition website

Next.js site built as static files (`out/`), so it can be served by Vercel or by any plain web host such as Hostinger.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the static site to out/
```

## Where the content lives

All text is in Markdown files under `content/`. Each file starts with a header between `---` lines, then the body text.

| Folder | What it holds | URL |
|---|---|---|
| `content/pages/` | Institutional pages (about, strategy, members, contact…) | `/about/`, `/contact/`… |
| `content/projects/` | Global Charter and the three projects | `/our-work/<file name>/` |
| `content/publications/` | Reports, briefings, statements | `/publications/<file name>/` |
| `content/news/` | News and statements | `/news/<file name>/` |
| `content/events/` | Events | `/events/` |

PDFs and images go in `public/files/` and are linked as `/files/<name>`.

### A new publication

Create `content/publications/my-report.md`:

```markdown
---
title: My report
date: 2026-11-15
type: report            # report, briefing, strategy, statement or factsheet
summary: One or two sentences shown in lists.
project: peoples-fiscal-monitor   # optional: a file name from content/projects
pillars: [B, G]                   # optional: letters of the ABC-DEFG
cover: /files/my-report-cover.jpg # optional
languages:
  - { lang: en, label: English, file: /files/my-report-en.pdf }
  - { lang: es, label: Español, file: /files/my-report-es.pdf }
---

Body text of the publication page.
```

Add `draft: true` to keep an entry off the site.

### A news item

`content/news/<name>.md` with `title`, `date`, `summary` and optional `kind: statement`.

### An event

`content/events/<name>.md` with `title`, `date`, `start` (YYYY-MM-DD), optional `end`, `place`, `link`, `summary`.

## Old WordPress addresses

Any content file can carry `legacyUrl: "/old/address/"`. Before each build, `scripts/redirects.mjs` turns these into permanent redirects in `vercel.json` (Vercel) and `public/.htaccess` (Hostinger/Apache), plus section-level rules for `/reports/`, `/materials/`, `/issues/`, `/conferences/`, `/category/` and `/tag/`.

Files from the old site keep their original address under `public/wp-content/uploads/YYYY/MM/`, so existing links to PDFs keep working.

## Menu

The main menu and its submenus are in `lib/site.ts`.

## Settings (environment variables)

| Variable | Use |
|---|---|
| `NEXT_PUBLIC_PREVIEW` | Leave unset while in preview: search engines are asked not to index. Set to `false` at launch. |
| `NEXT_PUBLIC_SITE_URL` | Public address, e.g. `https://financialtransparency.org` |
| `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` | Cloudflare Web Analytics site token; enables cookie-free visit statistics |
| `NEXT_PUBLIC_BREVO_FORM_URL` | Action URL of the Brevo sign-up form; enables the newsletter form |

## Publishing

- **Vercel:** import the GitHub repository; framework Next.js, no other settings needed. Every push publishes a new version.
- **Hostinger or another host:** run `npm run build` and upload the contents of `out/` to `public_html/`.

## Identity

Logo files are in `public/brand/`; colours and type are defined at the top of `app/globals.css` (Archivo; navy `#263866`, FTC blue `#3D86AE`, amber `#F2B233` for buttons only).
