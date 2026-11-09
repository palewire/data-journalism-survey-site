<!--
  The standard palewi.re masthead + nav, reused as-is across Ben's sites
  (see palewi.re's own header and the sphinx-palewire-theme nav.html).
  Links point back to palewi.re itself, since this site isn't part of
  that domain. Sizes/margins below are copied from palewi.re's own
  stylesheet (nav, .shingle, .links, .topbar rules) rather than estimated,
  so the masthead's height and type size match exactly.
-->
<nav aria-label="palewi.re">
  <div class="row">
    <a class="shingle" href="https://palewi.re/">palewire</a>
    <ul class="links">
      <li><a href="https://palewi.re/posts/">Posts</a></li>
      <li><a href="https://palewi.re/clips/">Clips</a></li>
      <li><a href="https://palewi.re/apps/">Apps</a></li>
      <li><a href="https://palewi.re/code/">Code</a></li>
      <li><a href="https://palewi.re/guides/">Guides</a></li>
      <li><a href="https://palewi.re/talks/">Talks</a></li>
      <li><a href="https://palewi.re/who-is-ben-welsh/">About</a></li>
    </ul>
  </div>
</nav>
<div class="topbar"></div>

<style>
  nav {
    display: block;
    margin: 0.625em 0;
    font-size: 1em;
    line-height: 1.7em;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .shingle {
    padding-left: 0.15em;
    font-size: 1.7em;
    font-weight: var(--font-weight-bold);
    color: var(--color-fg);
  }

  .shingle:visited {
    color: var(--color-fg);
  }

  .shingle:hover {
    color: var(--color-link);
    text-decoration: none;
  }

  .links {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .links li {
    margin-left: 0.5em;
    font-size: 0.9em;
    font-weight: var(--font-weight-light);
  }

  .links a {
    color: var(--color-link);
  }

  .links a:hover {
    text-decoration: underline;
  }

  @media (max-width: 550px) {
    .links {
      display: none;
    }
  }

  .topbar {
    margin: 0.625em 0 20px;
    border-bottom: var(--rule-topbar);
  }
</style>
