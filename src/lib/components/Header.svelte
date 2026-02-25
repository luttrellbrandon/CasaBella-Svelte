<script lang="ts">
  import { site } from '$lib/content/site';
</script>

<header class="navbar bg-base-200 shadow-lg">
  <div class="navbar-start">
    <a href="/" class="btn btn-ghost text-xl">{site.title}</a>
  </div>
  <div class="navbar-center hidden md:flex">
    <span class="text-base-content/70">{site.tagline}</span>
  </div>
  <div class="navbar-end"></div>
</header>
