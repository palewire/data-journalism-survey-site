<!--
  The standard palewi.re masthead + nav, reused as-is across Ben's sites
  (see palewi.re's own header and the sphinx-palewire-theme nav.html).
  Links point back to palewi.re itself, since this site isn't part of
  that domain. Sizes/margins below are copied from palewi.re's own
  stylesheet (nav, .shingle, .links, .topbar rules) rather than estimated,
  so the masthead's height and type size match exactly.

  The mobile nav below 550px reuses palewi.re's own pattern: a hamburger
  button opening a slide-in drawer, built on the native HTML Popover API
  (popovertarget / popover) rather than JS state, the same way palewi.re's
  own markup does it.
-->
<script lang="ts">
  const NAV_LINKS: { href: string; label: string }[] = [
    { href: 'https://palewi.re/posts/', label: 'Posts' },
    { href: 'https://palewi.re/clips/', label: 'Clips' },
    { href: 'https://palewi.re/apps/', label: 'Apps' },
    { href: 'https://palewi.re/code/', label: 'Code' },
    { href: 'https://palewi.re/guides/', label: 'Guides' },
    { href: 'https://palewi.re/talks/', label: 'Talks' },
    { href: 'https://palewi.re/who-is-ben-welsh/', label: 'About' }
  ];
</script>

<nav aria-label="palewi.re">
  <div class="row">
    <a class="shingle" href="https://palewi.re/">palewire</a>
    <ul class="links desktop-nav">
      {#each NAV_LINKS as link (link.href)}
        <li><a href={link.href}>{link.label}</a></li>
      {/each}
    </ul>
    <div class="nav-menu">
      <button
        type="button"
        class="nav-menu-toggle"
        popovertarget="mobile-nav-links"
        aria-label="Menu"
      >
        <span class="hamburger" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      <div id="mobile-nav-links" class="nav-drawer" popover="auto">
        <div class="nav-drawer-header">
          <span>Menu</span>
          <button
            type="button"
            class="nav-menu-close"
            popovertarget="mobile-nav-links"
            popovertargetaction="hide"
            aria-label="Close menu"
          >
            <span aria-hidden="true"></span>
          </button>
        </div>
        <ul>
          {#each NAV_LINKS as link (link.href)}
            <li><a href={link.href}>{link.label}</a></li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</nav>
<div class="topbar"></div>

<style>
  nav {
    display: block;
    margin: 0.75em 0 0.5em;
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

  .nav-menu {
    display: none;
  }

  @media (max-width: 550px) {
    .desktop-nav {
      display: none;
    }

    .nav-menu {
      display: block;
    }
  }

  .nav-menu-toggle {
    display: flex;
    width: 32px;
    height: 32px;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .nav-menu-toggle:focus-visible {
    outline: 2px solid var(--color-link);
    outline-offset: 3px;
  }

  .hamburger {
    display: flex;
    width: 20px;
    flex-direction: column;
    gap: 4px;
  }

  .hamburger span {
    height: 2px;
    background: var(--color-link);
  }

  .nav-drawer {
    inset: 0 0 0 auto;
    box-sizing: border-box;
    width: min(14rem, 80vw);
    height: 100dvh;
    max-height: none;
    margin: 0;
    padding: 1em 1.25em;
    border: 0;
    border-left: 1px solid var(--color-rule-subtle);
    background: var(--color-bg);
    text-align: left;
  }

  .nav-drawer::backdrop {
    background: color-mix(in srgb, var(--color-link) 18%, transparent);
  }

  .nav-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75em;
    padding-bottom: 0.5em;
    border-bottom: var(--rule-thick);
    color: var(--color-fg);
    font-size: 1.15em;
    font-weight: var(--font-weight-bold);
  }

  .nav-drawer ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .nav-drawer li {
    margin: 0;
    border-bottom: var(--rule-section);
    font-size: 1em;
  }

  .nav-drawer li a {
    display: block;
    padding: 0.65em 0;
    color: var(--color-link);
  }

  .nav-menu-close {
    position: relative;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .nav-menu-close span::before,
  .nav-menu-close span::after {
    position: absolute;
    top: 15px;
    right: 6px;
    width: 20px;
    height: 2px;
    background: var(--color-link);
    content: '';
  }

  .nav-menu-close span::before {
    transform: rotate(45deg);
  }

  .nav-menu-close span::after {
    transform: rotate(-45deg);
  }

  .nav-menu-close:focus-visible {
    outline: 2px solid var(--color-link);
    outline-offset: 2px;
  }

  .topbar {
    margin: 0 0 20px;
    border-bottom: var(--rule-topbar);
  }
</style>
