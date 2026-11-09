import { base } from '$app/paths';
import type { Course, SearchEntry } from '$lib/types';
import type { PageLoad } from './$types';

/**
 * Loads the full course bibliography, plus the flattened search-entry
 * array that powers the free-text search box.
 *
 * Both files are published statically by hand from the private survey
 * pipeline (see the project README):
 *   - `static/data/courses.json`: the full course bibliography.
 *   - `static/data/search-entries.json`: a left join of every course
 *     against whichever `search-index/<id>.json` syllabus excerpt exists
 *     for it, built by `scripts/build-search-index.mjs`. Doing this join
 *     ahead of time (at build time) avoids needing a directory listing of
 *     `search-index/` at runtime, which a static site can't provide.
 *
 * Args:
 *   fetch: The SvelteKit-provided fetch function for this load.
 *
 * Returns:
 *   An object with a `courses` array of `Course` records and an `entries`
 *   array of `SearchEntry` records.
 *
 * Example:
 *   // Called automatically by SvelteKit before rendering `+page.svelte`.
 *   const { courses, entries } = await load({ fetch });
 */
export const load: PageLoad = async ({ fetch }) => {
  const [coursesResponse, entriesResponse] = await Promise.all([
    fetch(`${base}/data/courses.json`),
    fetch(`${base}/data/search-entries.json`)
  ]);
  const courses: Course[] = await coursesResponse.json();
  const entries: SearchEntry[] = entriesResponse.ok ? await entriesResponse.json() : [];
  return { courses, entries };
};
