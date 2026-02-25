<script lang="ts">
  import '$lib/styles/app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<div class="flex min-h-screen flex-col">
  <Header />
  <slot />
  <Footer />
</div>
