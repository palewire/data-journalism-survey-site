<script lang="ts">
  import type { Snippet } from 'svelte';
  import '../app.css';
  import { PalewireMasthead, SiteFooter, SiteHeader, Tagline } from '$lib/components';
  import type { LayoutData } from './$types';

  let { children, data }: { children: Snippet; data: LayoutData } = $props();

  const SOCIAL_TITLE = 'Data Journalism Survey';
  const SOCIAL_DESCRIPTION =
    'A searchable bibliography of data-journalism courses taught at schools worldwide.';
</script>

<svelte:head>
  <title>{SOCIAL_TITLE}</title>
  <meta property="og:type" content="website" />
  <meta property="og:title" content={SOCIAL_TITLE} />
  <meta property="og:description" content={SOCIAL_DESCRIPTION} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={SOCIAL_TITLE} />
  <meta name="twitter:description" content={SOCIAL_DESCRIPTION} />
</svelte:head>

<div class="page">
  <PalewireMasthead />
  <SiteHeader />
  <Tagline total={data.total} />
  <main>
    {@render children()}
  </main>
  <SiteFooter />
</div>
