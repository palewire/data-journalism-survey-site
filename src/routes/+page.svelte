<script lang="ts">
  import { SearchBox } from '$lib/components';
  import { search as searchEntries } from '$lib/search';
  import type { Course, SearchEntry } from '$lib/types';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const courses: Course[] = $derived(data.courses);
  const entries: SearchEntry[] = $derived(data.entries);

  // -- Sortable table headers, default sort: course title -------------------

  type SortKey = 'course_name' | 'instructors' | 'school';
  type SortDirection = 'asc' | 'desc';

  let sortKey = $state<SortKey>('course_name');
  let sortDirection = $state<SortDirection>('asc');

  const textCollator = new Intl.Collator(undefined, {
    sensitivity: 'base',
    ignorePunctuation: true
  });

  function toggleSort(key: SortKey): void {
    if (sortKey === key) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      return;
    }
    sortKey = key;
    sortDirection = 'asc';
  }

  function sortLabel(label: string, key: SortKey): string {
    if (sortKey !== key) return `Sort by ${label}, currently unsorted`;
    return `Sort by ${label}, currently ${sortDirection === 'asc' ? 'ascending' : 'descending'}`;
  }

  const sortedCourses = $derived(
    [...courses].sort((a, b) => {
      const order = textCollator.compare(a[sortKey], b[sortKey]);
      return sortDirection === 'asc' ? order : -order;
    })
  );

  // -- Free-text search, powered by MiniSearch over `entries` --------------
  //
  // `entries` (loaded in +page.ts) is a left join of every course against
  // its syllabus excerpt, if one exists — most courses have no excerpt and
  // are still searchable by name/instructor/school alone. See
  // src/lib/search.ts and scripts/build-search-index.mjs.

  let searchQuery = $state('');
  const isSearching = $derived(searchQuery.trim().length > 0);
  const searchResults = $derived(
    isSearching ? searchEntries(entries, searchQuery, { limit: 50 }) : []
  );

  function pluralize(count: number, singular: string): string {
    return `${count.toLocaleString()} ${singular}${count === 1 ? '' : 's'}`;
  }
</script>

<svelte:head>
  <meta
    name="description"
    content="A searchable bibliography of data-journalism courses taught at schools worldwide."
  />
</svelte:head>

<SearchBox
  bind:value={searchQuery}
  placeholder="Search titles, teachers, schools and course materials…"
/>

{#if isSearching}
  <p class="result-count">{pluralize(searchResults.length, 'search result')}</p>
  {#if searchResults.length === 0}
    <p class="no-results">No courses matched &ldquo;{searchQuery}&rdquo;.</p>
  {:else}
    <table class="entries results">
      <thead class="visually-hidden">
        <tr>
          <th scope="col">Course</th>
          <th scope="col">Excerpt</th>
        </tr>
      </thead>
      <tbody>
        {#each searchResults as result (result.id)}
          <tr>
            <td class="c-title">
              {#if result.url}
                <a href={result.url} target="_blank" rel="noopener external"
                  ><strong>{result.course_name}</strong></a
                >
              {:else}
                <strong>{result.course_name}</strong>
              {/if}
              {#if result.instructors}<br /><span class="muted">{result.instructors}</span>{/if}
              <br /><span class="muted">{result.school}</span>
            </td>
            <td class="c-excerpt">
              {#if result.excerpt}
                {result.excerpt.slice(0, 220)}{result.excerpt.length > 220 ? '…' : ''}
              {:else}
                <span class="muted">No syllabus excerpt on file.</span>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
{:else}
  <table class="entries">
    <thead>
      <tr>
        {#each [['course_name', 'Course', 'c-title'], ['instructors', 'Instructor(s)', ''], ['school', 'School', '']] as [key, label, cls] (key)}
          <th
            scope="col"
            class={cls}
            aria-sort={sortKey === key
              ? sortDirection === 'asc'
                ? 'ascending'
                : 'descending'
              : 'none'}
          >
            <button
              type="button"
              class="sort-button"
              aria-label={sortLabel(label, key as SortKey)}
              onclick={() => toggleSort(key as SortKey)}
            >
              {label}
              <span class="sort-indicator" aria-hidden="true">
                {sortKey === key ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
              </span>
            </button>
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each sortedCourses as course (course.id)}
        <tr>
          <td class="c-title">
            {#if course.url}
              <a href={course.url} target="_blank" rel="noopener external">{course.course_name}</a>
            {:else}
              {course.course_name}
            {/if}
          </td>
          <td class="c-byline">{course.instructors}</td>
          <td>{course.school}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  /* Matches PubDate.svelte's treatment (0.8em, font-weight-light, muted). */
  .result-count {
    margin: 0 0 var(--space-lg);
    color: var(--color-muted);
    font-size: 0.8em;
    font-weight: var(--font-weight-light);
  }

  .entries.results .c-excerpt {
    color: var(--color-muted);
  }

  .entries .c-byline {
    color: var(--color-muted);
  }

  .sort-button {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }

  .sort-button:hover {
    color: var(--color-fg);
  }

  .sort-button:focus-visible {
    outline: 2px solid var(--color-fg);
    outline-offset: 2px;
  }

  .sort-indicator {
    font-size: 0.8em;
  }
</style>
