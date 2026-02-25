<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();

  function formatPrice(n: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  }
</script>

<main class="flex-1">
  <!-- Hero -->
  <section class="hero min-h-[40vh] bg-base-300">
    <div class="hero-content text-center">
      <div>
        <h1 class="text-5xl font-bold">{data.site?.title ?? 'Casa Bella'}</h1>
        <p class="py-4 text-xl">{data.site?.tagline ?? 'Home Owners Association'}</p>
      </div>
    </div>
  </section>

  <!-- Community -->
  <section class="py-12 px-4">
    <div class="container mx-auto max-w-4xl">
      <h2 class="text-3xl font-bold mb-4">Our Community</h2>
      <p class="text-base-content/90 mb-4">
        Past the stately oak-lined entrance, tranquil lakes, and elegant fountains—beyond the privacy of a secure gated entry—lies the prestigious community of Casa Bella.
      </p>
      <p class="text-base-content/90">
        Designed for residents with refined tastes, Casa Bella showcases luxury custom homes built by some of Brevard County's most acclaimed builders. Each home is thoughtfully crafted with indulgent features like spa-inspired bathrooms, gourmet chef's kitchens, marble flooring, and expansive open-concept designs.
      </p>
    </div>
  </section>

  <!-- Location -->
  <section class="py-12 px-4 bg-base-200">
    <div class="container mx-auto max-w-4xl">
      <h2 class="text-3xl font-bold mb-4">Location</h2>
      <p class="text-base-content/90 mb-4">
        Situated just north of the Pineda Causeway, in Melbourne, Florida, Casa Bella is located conveniently to Interstate 95. With an hour drive to Orlando and just 10 minutes to the beaches of the Atlantic ocean and the Town of Viera.
      </p>
      <ul class="list-disc list-inside space-y-1">
        <li>10 minutes to public beach</li>
        <li>10 minutes to The Avenue Viera</li>
        <li>45 min to ORL INT</li>
      </ul>
    </div>
  </section>

  <!-- Amenities -->
  <section class="py-12 px-4">
    <div class="container mx-auto max-w-4xl">
      <h2 class="text-3xl font-bold mb-4">Amenities</h2>
      <p class="text-base-content/90 mb-4">
        Offering a safe and family-inviting neighborhood, featuring a private fenced pathway to the nearby elementary throughout the community and a secure playground. Additional amenities include lighted tennis courts and impeccably designed and maintained grounds.
      </p>
      <ul class="list-disc list-inside space-y-1">
        <li>Fenced path to elementary school</li>
        <li>Secure playground</li>
        <li>Lighted tennis courts</li>
        <li>Full court basketball</li>
        <li>Newly renovated clubhouse (2025)</li>
      </ul>
    </div>
  </section>

  <!-- On the Market -->
  <section class="py-12 px-4 bg-base-200">
    <div class="container mx-auto max-w-6xl">
      <h2 class="text-3xl font-bold mb-6">On the Market</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {#each data.listings ?? [] as listing}
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">{listing.address}</h3>
              <p>
                <span class="badge {listing.status === 'sold' ? 'badge-ghost' : 'badge-primary'}">
                  {listing.status === 'sold' ? 'Sold' : 'For Sale'}
                </span>
              </p>
              <p class="font-semibold">{formatPrice(listing.price)}</p>
              <p class="text-sm text-base-content/70">{listing.sqft} SQFT · {listing.beds} bed · {listing.baths} bath</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- HOA Documents & Forms -->
  <section class="py-12 px-4">
    <div class="container mx-auto max-w-4xl">
      <h2 class="text-3xl font-bold mb-6">HOA Documents &amp; Forms</h2>
      <div class="space-y-4">
        {#each data.documents ?? [] as doc}
          <div class="card bg-base-200 shadow">
            <div class="card-body">
              {#if doc.category}
                <p class="text-sm text-base-content/70">{doc.category}</p>
              {/if}
              <a href={doc.href} class="link link-hover font-medium">{doc.title}</a>
              {#if doc.description}
                <p class="text-sm">{doc.description}</p>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- HOA Links -->
  <section class="py-12 px-4 bg-base-200">
    <div class="container mx-auto max-w-4xl">
      <h2 class="text-3xl font-bold mb-6">HOA Links</h2>
      <div class="flex flex-wrap gap-4">
        {#each data.links ?? [] as link}
          <a href={link.href} class="btn btn-primary" target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined}>
            {link.title}
          </a>
        {/each}
      </div>
      {#each data.links ?? [] as link}
        <p class="mt-2 text-sm text-base-content/70">{link.description}</p>
      {/each}
    </div>
  </section>

  <!-- Board of Directors -->
  <section class="py-12 px-4">
    <div class="container mx-auto max-w-4xl">
      <h2 class="text-3xl font-bold mb-6">Board of Directors</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        {#each data.board ?? [] as member}
          <div class="card bg-base-200 shadow">
            <div class="card-body">
              <h3 class="font-semibold text-primary">{member.role}</h3>
              <p>{member.name}</p>
            </div>
          </div>
        {/each}
      </div>
      <a href="mailto:board@casabellahoa.net" class="btn btn-outline mt-6">Email the Board</a>
    </div>
  </section>

  <!-- Meetings & Property Management -->
  <section class="py-12 px-4 bg-base-200">
    <div class="container mx-auto max-w-4xl">
      <p class="mb-6 text-lg">{data.site?.meetingNote}</p>
      {#if data.site?.propertyManagement}
        <div class="card bg-base-100 shadow">
          <div class="card-body">
            <h3 class="card-title">{data.site.propertyManagement.name} {data.site.propertyManagement.label}</h3>
            <p>{data.site.propertyManagement.address}</p>
            <p><a href="tel:+13217848011" class="link">{data.site.propertyManagement.phone}</a></p>
            <p class="text-sm">{data.site.propertyManagement.hours.weekdays}</p>
            <p class="text-sm">{data.site.propertyManagement.hours.friday}</p>
          </div>
        </div>
      {/if}
    </div>
  </section>
</main>
