<script lang="ts">
  import '$lib/styles/app.css';
  import Footer from '$lib/components/Footer.svelte';
</script>

<div class="app-background" aria-hidden="true"></div>
<div class="relative z-[1] flex min-h-screen flex-col">
  <slot />
  <Footer />
</div>
