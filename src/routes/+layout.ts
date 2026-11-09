import { base } from '$app/paths';
import type { Course } from '$lib/types';
import type { LayoutLoad } from './$types';

// Pre-render the single route. adapter-static will emit pure HTML on build.
export const prerender = true;

/**
 * Loads just the total course count, for the homepage tagline.
 *
 * This re-fetches `courses.json` (also loaded by `+page.ts`), which is
 * fine at this dataset's size (~1,400 rows): the browser serves the
 * second request from cache, and it keeps the layout self-contained
 * without plumbing data up from the page.
 *
 * Args:
 *   fetch: The SvelteKit-provided fetch function for this load.
 *
 * Returns:
 *   An object with `total`, the number of courses in the bibliography.
 */
export const load: LayoutLoad = async ({ fetch }) => {
  const response = await fetch(`${base}/data/courses.json`);
  const courses: Course[] = await response.json();
  return { total: courses.length };
};
