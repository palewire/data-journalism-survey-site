# data-journalism-survey-site

A public, searchable browse page for a bibliography of data-journalism courses taught at schools worldwide (schools, instructors, years and links to source material).

This is a companion site to a private research repository, `data-journalism-survey`, which does the actual scraping and verification work of building that bibliography. This repo never sees raw or unverified data — it only ever consumes a sanitized, already-filtered export that gets copied in by hand. There is no backend and no database here: the whole site is static files, built with [SvelteKit](https://kit.svelte.dev/) and deployed as flat HTML/JS/CSS.

The design and site structure (design tokens, font loading, header/footer/search components) are ported from a sibling project, [`fivethirtyeightindex.com`](https://github.com/palewire/fivethirtyeightindex.com), the same author's palewi.re visual language applied to another SvelteKit browse/search site.

## Data

The published dataset lives at:

- [`static/data/courses.json`](static/data/courses.json) ([raw](https://raw.githubusercontent.com/palewire/data-journalism-survey-site/main/static/data/courses.json)) — a JSON array of course records (name, instructors, school, country, region, year/term, topic relevance, a source link, etc). Also served live at [palewi.re/docs/data-journalism-courses/data/courses.json](https://palewi.re/docs/data-journalism-courses/data/courses.json).
- [`static/data/search-index/`](static/data/search-index) — one file per course that has verified syllabus text, each holding a short (~500 word) excerpt used to power the search box. Not every course has one of these.
- [`static/data/search-entries.json`](static/data/search-entries.json) — the build-time left join of the two above (see [Search](#search)); the exact file the in-browser search index is built from.

There's no public CSV — the canonical dataset is a CSV in the private `data-journalism-survey` pipeline, and this JSON is its sanitized, public export.

## How the data gets here

**These files are published by hand from the private `data-journalism-survey` pipeline — this repo does not fetch or generate them itself.** There is no CI job here that pulls from the private repo; a human runs `djs export-public` there and copies the result in before each deploy.

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
