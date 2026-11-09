<script lang="ts">
  interface Props {
    total: number;
  }
  let { total }: Props = $props();
</script>

<p>
  Explore {total.toLocaleString()} syllabi collected from colleges and universities around the world
</p>

<style>
  /* Matches div.body h1 + p in sphinx-palewire-theme: a paragraph
     directly following the page h1 gets a tight top margin. */
  p {
    margin: 0.125em 0 0.3em;
    font-weight: var(--font-weight-light);
    line-height: 1.45;
  }
</style>
