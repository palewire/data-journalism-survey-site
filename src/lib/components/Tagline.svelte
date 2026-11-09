<script lang="ts">
  interface Props {
    total: number;
  }
  let { total }: Props = $props();
</script>

<p>
  Explore {total.toLocaleString()} data journalism courses taught at schools worldwide
</p>

<style>
  /* Matches div.body h1 + p in sphinx-palewire-theme: a paragraph
     directly following the page h1 gets a tight top margin. */
  p {
    margin: 0.125em 0 var(--space-lg);
    color: var(--color-muted);
    font-weight: var(--font-weight-light);
    line-height: 1.45;
  }
</style>
