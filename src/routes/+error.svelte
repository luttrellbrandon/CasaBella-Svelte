<script lang="ts">
  let { status, error }: { status: number; error: App.Error } = $props();
</script>

<div class="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
  <h1 class="text-2xl font-bold">Something went wrong</h1>
  <p class="text-error">{status} — {error?.message ?? 'Unknown error'}</p>
</div>
