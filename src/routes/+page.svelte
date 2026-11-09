<script lang="ts">
  import { SearchBox } from '$lib/components';
  import { search as searchEntries } from '$lib/search';
  import type { Course, SearchEntry } from '$lib/types';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const courses: Course[] = $derived(data.courses);
  const entries: SearchEntry[] = $derived(data.entries);

  const ALL = 'All';

  /** Derives a decade label ("2020s") from a course's start year, if known. */
  function decadeOf(course: Course): string | null {
    if (course.start_year == null) return null;
    return `${Math.floor(course.start_year / 10) * 10}s`;
  }

  function uniqueSorted(values: (string | null)[]): string[] {
    return [...new Set(values.filter((v): v is string => !!v))].sort();
  }

  const regions = $derived(uniqueSorted(courses.map((c) => c.region)));
  const countries = $derived(uniqueSorted(courses.map((c) => c.country)));
  const topicRelevances = $derived(uniqueSorted(courses.map((c) => c.topic_relevance)));
  const entryTypes = $derived(uniqueSorted(courses.map((c) => c.entry_type)));
  const decades = $derived(uniqueSorted(courses.map(decadeOf)).sort().reverse());

  let selectedRegion = $state(ALL);
  let selectedCountry = $state(ALL);
  let selectedTopic = $state(ALL);
  let selectedEntryType = $state(ALL);
  let selectedDecade = $state(ALL);

  const filteredCourses = $derived(
    courses.filter((course) => {
      if (selectedRegion !== ALL && course.region !== selectedRegion) return false;
      if (selectedCountry !== ALL && course.country !== selectedCountry) return false;
      if (selectedTopic !== ALL && course.topic_relevance !== selectedTopic) return false;
      if (selectedEntryType !== ALL && course.entry_type !== selectedEntryType) return false;
      if (selectedDecade !== ALL && decadeOf(course) !== selectedDecade) return false;
      return true;
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
</script>

<svelte:head>
  <meta
    name="description"
    content="A searchable bibliography of data-journalism courses taught at schools worldwide."
  />
</svelte:head>

<SearchBox bind:value={searchQuery} placeholder="Search syllabus text, course names, schools…" />

{#if isSearching}
  <h2 class="section-heading">Search results ({searchResults.length})</h2>
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
  <section class="facets">
    <div>
      <label for="region">Region</label>
      <select id="region" bind:value={selectedRegion}>
        <option value={ALL}>All regions</option>
        {#each regions as region (region)}
          <option value={region}>{region}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="country">Country</label>
      <select id="country" bind:value={selectedCountry}>
        <option value={ALL}>All countries</option>
        {#each countries as country (country)}
          <option value={country}>{country}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="topic">Topic relevance</label>
      <select id="topic" bind:value={selectedTopic}>
        <option value={ALL}>All</option>
        {#each topicRelevances as topic (topic)}
          <option value={topic}>{topic}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="entry-type">Entry type</label>
      <select id="entry-type" bind:value={selectedEntryType}>
        <option value={ALL}>All</option>
        {#each entryTypes as entryType (entryType)}
          <option value={entryType}>{entryType}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="decade">Decade</label>
      <select id="decade" bind:value={selectedDecade}>
        <option value={ALL}>All decades</option>
        {#each decades as decade (decade)}
          <option value={decade}>{decade}</option>
        {/each}
      </select>
    </div>
  </section>

  <h2 class="section-heading">Courses ({filteredCourses.length})</h2>
  <table class="entries">
    <thead>
      <tr>
        <th scope="col" class="c-title">Course</th>
        <th scope="col">Instructor(s)</th>
        <th scope="col">School</th>
        <th scope="col">Country</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredCourses as course (course.id)}
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
          <td>{course.country}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  .facets {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
    font-size: var(--font-size-table);
  }

  @media (min-width: 640px) {
    .facets {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }

  .facets label {
    display: block;
    margin-bottom: var(--space-xs);
    color: var(--color-muted);
    font-size: var(--font-size-small);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .facets select {
    width: 100%;
    padding: 0.3em 0.4em;
    font: inherit;
    border: var(--rule-thin);
    background: var(--color-bg);
    color: var(--color-fg);
  }

  .entries.results .c-excerpt {
    color: var(--color-muted);
  }

  .entries .c-byline {
    color: var(--color-muted);
  }
</style>
