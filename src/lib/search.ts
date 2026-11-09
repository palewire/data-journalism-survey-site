/**
 * MiniSearch wrapper: lazy-build the index once per page lifecycle.
 *
 * Ported from github.com/palewire/fivethirtyeightindex.com
 * (web/src/lib/search.ts), swapping the article-index fields for our
 * course-index fields.
 */
import MiniSearch from 'minisearch';
import type { SearchEntry } from './types';

let searchIndex: MiniSearch<SearchEntry> | null = null;

/**
 * Builds (or returns the cached) MiniSearch index over course entries.
 *
 * Args:
 *   entries: The full array of `SearchEntry` records to index.
 *
 * Returns:
 *   A `MiniSearch` instance indexing `course_name`, `instructors`,
 *   `school`, and `excerpt`, with `course_name` weighted highest.
 *
 * Example:
 *   const index = buildIndex(entries);
 *   const hits = index.search('data visualization');
 */
export function buildIndex(entries: SearchEntry[]): MiniSearch<SearchEntry> {
  if (searchIndex) return searchIndex;
  const mini = new MiniSearch<SearchEntry>({
    idField: 'id',
    fields: ['course_name', 'instructors', 'school', 'excerpt'],
    storeFields: ['id', 'course_name', 'instructors', 'school', 'country', 'url', 'excerpt'],
    searchOptions: {
      boost: { course_name: 2 },
      prefix: true,
      fuzzy: 0.15,
      combineWith: 'AND'
    }
  });
  mini.addAll(entries);
  searchIndex = mini;
  return mini;
}

export interface SearchResult extends SearchEntry {
  score: number;
}

/**
 * Searches course entries by free-text query, falling back to the plain
 * entry list (sliced to `limit`) when the query is empty.
 *
 * Args:
 *   entries: The full array of `SearchEntry` records to search over.
 *   query: The free-text search query typed by the user.
 *   options: Optional `limit` (default 100) on the number of results.
 *
 * Returns:
 *   An array of `SearchResult` (a `SearchEntry` plus a MiniSearch `score`),
 *   ranked by relevance when `query` is non-empty.
 *
 * Example:
 *   const results = search(entries, 'investigative reporting', { limit: 20 });
 */
export function search(
  entries: SearchEntry[],
  query: string,
  options: { limit?: number } = {}
): SearchResult[] {
  const idx = buildIndex(entries);
  const limit = options.limit ?? 100;

  const trimmed = query.trim();
  if (!trimmed) {
    return entries.slice(0, limit).map((e) => ({ ...e, score: 0 }));
  }

  const hits = idx.search(trimmed) as unknown as Array<SearchEntry & { score: number }>;
  return hits.slice(0, limit);
}
