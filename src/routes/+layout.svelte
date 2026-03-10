<script lang="ts">
  import '$lib/styles/app.css';
  import Footer from '$lib/components/Footer.svelte';
</script>

<div class="site-background" aria-hidden="true"></div>
<div class="flex min-h-screen flex-col relative">
  <slot />
  <Footer />
</div>
