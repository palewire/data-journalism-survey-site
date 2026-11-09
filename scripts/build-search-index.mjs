#!/usr/bin/env node
/**
 * Builds the flattened search-entry file that powers the client-side
 * MiniSearch index (see src/lib/search.ts).
 *
 * Static sites can't list a directory at runtime, so there's no way for
 * the browser to discover which courses in `static/data/courses.json`
 * have a matching `static/data/search-index/<id>.json` syllabus excerpt.
 * This script does that join once, at build time, and writes the result
 * to `static/data/search-entries.json` — a left join of every course
 * against its excerpt, if one exists (most courses won't have one, and
 * are still searchable by name/instructor/school alone).
 *
 * This has no inputs or outputs as a function (it's a script), but
 * running it is equivalent to:
 *
 *   node scripts/build-search-index.mjs
 *
 * which is also wired into `pnpm run build` to run automatically before
 * `vite build`.
 */
import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const coursesPath = path.join(projectRoot, 'static/data/courses.json');
const searchIndexDir = path.join(projectRoot, 'static/data/search-index');
const outputPath = path.join(projectRoot, 'static/data/search-entries.json');

async function main() {
  if (!existsSync(coursesPath)) {
    console.log(`No courses.json found at ${coursesPath}; skipping search-entries build.`);
    return;
  }

  const courses = JSON.parse(await readFile(coursesPath, 'utf-8'));

  const excerptByCourseId = new Map();
  if (existsSync(searchIndexDir)) {
    const files = (await readdir(searchIndexDir)).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      const raw = await readFile(path.join(searchIndexDir, file), 'utf-8');
      const record = JSON.parse(raw);
      if (record.course_id) {
        excerptByCourseId.set(record.course_id, record);
      }
    }
  } else {
    console.log(`No search-index directory found at ${searchIndexDir}; building with no excerpts.`);
  }

  const entries = courses.map((course) => {
    const indexRecord = excerptByCourseId.get(course.id);
    return {
      id: course.id,
      course_name: course.course_name,
      instructors: course.instructors,
      school: course.school,
      country: course.country,
      url: indexRecord?.url || course.url || '',
      excerpt: indexRecord?.excerpt ?? ''
    };
  });

  await writeFile(outputPath, JSON.stringify(entries, null, 2) + '\n', 'utf-8');
  console.log(
    `Wrote ${entries.length} search entries (${excerptByCourseId.size} with excerpts) to ${outputPath}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
