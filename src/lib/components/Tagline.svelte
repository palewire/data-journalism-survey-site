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
  p {
    margin: 0 0 var(--space-lg);
    color: var(--color-muted);
    font-size: 1.15em;
    font-weight: var(--font-weight-light);
    line-height: 1.3;
  }
</style>
