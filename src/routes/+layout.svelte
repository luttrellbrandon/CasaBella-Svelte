<script lang="ts">
  import '$lib/styles/app.css';
  import Footer from '$lib/components/Footer.svelte';
</script>

<div class="flex min-h-screen flex-col">
  <slot />
  <Footer />
</div>
