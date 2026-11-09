# data-journalism-survey-site

A public, searchable browse page for a bibliography of data-journalism courses taught at schools worldwide (schools, instructors, years and links to source material).

This is a companion site to a private research repository, `data-journalism-survey`, which does the actual scraping and verification work of building that bibliography. This repo never sees raw or unverified data — it only ever consumes a sanitized, already-filtered export that gets copied in by hand. There is no backend and no database here: the whole site is static files, built with [SvelteKit](https://kit.svelte.dev/) and deployed as flat HTML/JS/CSS.

The design and site structure (design tokens, font loading, header/footer/search components) are ported from a sibling project, [`fivethirtyeightindex.com`](https://github.com/palewire/fivethirtyeightindex.com), the same author's palewi.re visual language applied to another SvelteKit browse/search site.

## How the data gets here

Two files are expected to exist under `static/data/` before building for real:

- `static/data/courses.json` — a JSON array of course records (name, instructors, school, country, region, year/term, topic relevance, a source link, etc).
- `static/data/search-index/<id>.json` — one file per course that has verified syllabus text, each holding a short (~500 word) excerpt used to power the search box. Not every course has one of these.

**These two paths are published by hand from the private `data-journalism-survey` pipeline — this repo does not fetch or generate them itself.** There is no CI job here that pulls from the private repo; a human copies the exported files in before each deploy.

Because those real files don't exist in this repo yet, `static/data/courses.json` and `static/data/search-index/*.json` currently contain a **small set of placeholder sample records** (clearly fake schools/courses) so the site has something to build and develop against. They are meant to be overwritten by the real export before this site is actually deployed.

## Search

Free-text search is powered by [MiniSearch](https://github.com/lucaong/minisearch), run entirely in the browser — no server, no third-party crawl. `scripts/build-search-index.mjs` left-joins `static/data/courses.json` against whichever `static/data/search-index/<id>.json` excerpt files exist, writing the merged result to `static/data/search-entries.json` (most courses have no excerpt and are still searchable by name/instructor/school alone). This join happens at build time, before `vite build`, because a static site has no way to list a directory at runtime to discover which excerpt files exist. `src/lib/search.ts` then builds a MiniSearch index over that merged file at page-load time in the browser.

## Development

```bash
pnpm install
pnpm dev       # local dev server
pnpm build     # builds static/data/search-entries.json, then the static site, into build/
pnpm preview   # serve the built site locally
pnpm lint      # svelte-check + eslint + prettier --check
pnpm format    # prettier --write
```
