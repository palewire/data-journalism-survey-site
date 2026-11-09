/**
 * A single data-journalism course record, as published in
 * `static/data/courses.json` by the private survey pipeline.
 */
export interface Course {
  id: string;
  course_name: string;
  instructors: string;
  school: string;
  country: string;
  region: string;
  year_term: string;
  start_year: number | null;
  end_year: number | null;
  season: string;
  term_type: string;
  language: string;
  topic_relevance: string;
  entry_type: string;
  url: string;
}

/**
 * A single pre-chunked syllabus excerpt, as published in
 * `static/data/search-index/<id>.json` by the private survey pipeline.
 * Only courses with verified syllabus text have one of these files.
 */
export interface SearchIndexRecord {
  course_id: string;
  excerpt: string;
  url: string;
}

/**
 * A flattened, search-friendly record combining a `Course` with its
 * optional syllabus excerpt. This is the shape MiniSearch indexes, and
 * the shape `static/data/search-entries.json` holds on disk (built by
 * `scripts/build-search-index.mjs`, which left-joins every course against
 * whichever `search-index/<id>.json` excerpt file exists for it).
 */
export interface SearchEntry {
  id: string;
  course_name: string;
  instructors: string;
  school: string;
  country: string;
  url: string;
  excerpt: string;
}
