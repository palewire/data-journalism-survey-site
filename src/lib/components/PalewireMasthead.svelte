<!--
  The standard palewi.re masthead + nav, reused as-is across Ben's sites
  (see palewi.re's own header and the sphinx-palewire-theme nav.html).
  Links point back to palewi.re itself, since this site isn't part of
  that domain. The gray rule below it is the "topbar" from that same
  source (--border-topbar: solid 10px var(--color-rule)).
-->
<header class="masthead">
  <a class="wordmark" href="https://palewi.re/">palewire</a>
  <nav aria-label="palewi.re">
    <ul>
      <li><a href="https://palewi.re/posts/">Posts</a></li>
      <li><a href="https://palewi.re/clips/">Clips</a></li>
      <li><a href="https://palewi.re/apps/">Apps</a></li>
      <li><a href="https://palewi.re/code/">Code</a></li>
      <li><a href="https://palewi.re/guides/">Guides</a></li>
      <li><a href="https://palewi.re/talks/">Talks</a></li>
      <li><a href="https://palewi.re/who-is-ben-welsh/">About</a></li>
    </ul>
  </nav>
</header>
<div class="topbar"></div>

<style>
  .masthead {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md);
    padding: var(--space-md) 0 0;
  }

  .wordmark {
    font-size: var(--font-size-brand);
    font-weight: var(--font-weight-display);
    color: var(--color-fg);
  }

  .wordmark:visited {
    color: var(--color-fg);
  }

  .wordmark:hover {
    color: var(--color-link);
    text-decoration: none;
  }

  nav ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0 var(--space-md);
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: var(--font-size-small);
  }

  nav a {
    color: var(--color-muted);
  }

  nav a:visited {
    color: var(--color-muted);
  }

  nav a:hover {
    color: var(--color-fg);
    text-decoration: underline;
  }

  .topbar {
    margin: var(--space-md) 0 0;
    border-bottom: var(--rule-topbar);
  }
</style>
