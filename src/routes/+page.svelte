<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import LocationMap from '$lib/components/LocationMap.svelte';
  let { data }: { data: PageData } = $props();

  let showFirst = $state(true);
  const HERO_INTERVAL_MS = 45_000;
  const FADE_DURATION_MS = 3000;

  // Carousel: all static images except background and hero
  const CAROUSEL_IMAGES = [
    '/images/carousel/clubhouse1.jpg',
    '/images/carousel/entry1.jpg',
    '/images/carousel/entry2.jpg',
    '/images/carousel/gatehouse1.jpg',
    '/images/carousel/playground1.jpg',
    '/images/carousel/playground2.png',
    '/images/carousel/sign1.jpg',
    '/images/carousel/tenniscourt1.jpg',
    '/images/carousel/tenniscourt2.jpg'
  ];
  let carouselIndex = $state(0);
  const carouselIndexRef = { current: 0 };
  const CAROUSEL_INTERVAL_MS = 5000;

  onMount(() => {
    const heroId = setInterval(() => {
      showFirst = !showFirst;
    }, HERO_INTERVAL_MS);
    const carouselId = setInterval(() => {
      carouselIndexRef.current = (carouselIndexRef.current + 1) % CAROUSEL_IMAGES.length;
      carouselIndex = carouselIndexRef.current;
    }, CAROUSEL_INTERVAL_MS);
    return () => {
      clearInterval(heroId);
      clearInterval(carouselId);
    };
  });

  function carouselPrev() {
    carouselIndex = (carouselIndex - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length;
    carouselIndexRef.current = carouselIndex;
  }
  function carouselNext() {
    carouselIndex = (carouselIndex + 1) % CAROUSEL_IMAGES.length;
    carouselIndexRef.current = carouselIndex;
  }

  function formatPrice(n: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  }
</script>

<main class="flex-1">
  <!-- Hero: background images fade on timer, overlay, title and nav buttons -->
  <section class="relative h-screen w-full min-h-screen bg-base-300 flex items-center justify-center overflow-hidden">
    <img
      src="/images/hero.jpg"
      alt="Casa Bella community — lake, fountain, and residential neighborhood"
      class="absolute inset-0 h-full w-full object-cover transition-opacity duration-[3000ms] ease-in-out {showFirst ? 'opacity-100' : 'opacity-0'}"
      aria-hidden="{!showFirst}"
    />
    <img
      src="/images/hero2.jpg"
      alt="Casa Bella community at dusk — fountain and pond"
      class="absolute inset-0 h-full w-full object-cover transition-opacity duration-[3000ms] ease-in-out {showFirst ? 'opacity-0' : 'opacity-100'}"
      aria-hidden="{showFirst}"
    />
    <div class="absolute inset-0 bg-black/50" aria-hidden="true"></div>
    <div class="absolute bottom-0 left-0 right-0 z-[5] h-40 bg-gradient-to-t from-black via-black/80 to-transparent" aria-hidden="true"></div>
    <div class="relative z-10 flex flex-col items-center justify-center gap-6 px-4 py-12 text-center">
      <div class="hero-signature" aria-label={data.site?.title ?? 'Casa Bella'}>
        <svg
          viewBox="0 0 800 200"
          class="w-[22rem] sm:w-[28rem] md:w-[34rem] lg:w-[40rem]"
          role="img"
          aria-hidden="true"
        >
          <text
            x="50%"
            y="55%"
            text-anchor="middle"
            dominant-baseline="middle"
            style="font-family: 'Adediala', 'Pinyon Script', cursive; font-size: 180px; letter-spacing: 0.02em;"
          >
            {data.site?.title ?? 'Casa Bella'}
          </text>
        </svg> 
      </div>
    </div> 
  </section>

  <!-- Community -->
  <section 
    id="community"
    class="relative overflow-hidden py-12 px-4 scroll-mt-16 bg-center"
  >
    <!-- Smooth fade from dark hero into site background -->
    <div
      class="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/70 to-transparent"
      aria-hidden="true"
    ></div>
    <div class="container relative mx-auto max-w-4xl">
      <div
        class="overflow-hidden rounded-3xl border-2 bg-black/70 shadow-[0_18px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        style="border-color: rgba(240, 221, 174, 0.35);"
      >
        <div
          class="border-b bg-black/60 px-6 py-2 md:px-8 md:py-3 backdrop-blur-xl"
          style="border-color: rgba(240, 221, 174, 0.35);"
        >
          <h2 class="text-6xl font-normal sm:text-7xl md:text-8xl text-white" style="font-family: 'Adediala', 'Pinyon Script', cursive;">
            Our Community
          </h2>
        </div>

        <div class="p-8 text-white">
          <p class="mb-4 text-white/90">
            Just beyond the oak-lined entrance, scenic lakes, and gentle fountains, you'll find Casa Bella, a private gated community known for its peaceful setting and genuine sense of connection. Tucked away from the rush of everyday life, it offers a calm, welcoming environment where residents can truly feel at home.
          </p>
          <p class="mb-4 text-white/90">
            Life in Casa Bella is centered around community. Neighbors gather at the clubhouse for events and casual get-togethers, enjoy friendly matches on the tennis courts, and spend sunny afternoons at the children's playground. The quiet streets and beautifully maintained surroundings make it just as inviting for evening walks as they are for weekend bike rides.
          </p>
          <p class="text-white/90">
            With welcoming neighbors, shared spaces designed for bringing people together, and a serene atmosphere throughout, Casa Bella offers more than a place to live. It offers a place to belong.
          </p>

          <!-- Image carousel (all images except background and hero) -->
          <div class="mt-10 w-full max-w-4xl">
            <div class="relative overflow-hidden rounded-lg bg-black/30 shadow-xl">
              <div class="relative aspect-[16/10] w-full">
                {#each CAROUSEL_IMAGES as src, i}
                  <img
                    src={src}
                    alt="Casa Bella community"
                    class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out {i === carouselIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}"
                  />
                {/each}
              </div>
              <button
                type="button"
                class="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
                aria-label="Previous image"
                onclick={carouselPrev}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                class="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
                aria-label="Next image"
                onclick={carouselNext}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div class="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5">
                {#each CAROUSEL_IMAGES as _, i}
                  <button
                    type="button"
                    class="h-2 w-2 rounded-full transition {i === carouselIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}"
                    aria-label="Go to image {i + 1}"
                    onclick={() => { carouselIndex = i; carouselIndexRef.current = i; }}
                  ></button>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Location -->
  <section
    class="relative overflow-hidden py-12 px-4 bg-center text-white"
  >
    <div class="container relative z-10 mx-auto max-w-4xl">
      <div
        class="overflow-hidden rounded-3xl border-2 bg-black/70 shadow-[0_18px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        style="border-color: rgba(240, 221, 174, 0.35);"
      >
        <!-- Banner: glassy header, same font/size as Our Community, left-justified -->
        <div
          class="border-b bg-black/60 px-6 py-2 md:px-8 md:py-3 backdrop-blur-xl"
          style="border-color: rgba(240, 221, 174, 0.35);"
        >
          <h2
            class="text-6xl font-normal sm:text-7xl md:text-8xl text-white"
            style="font-family: 'Adediala', 'Pinyon Script', cursive;">
            Location
          </h2>
        </div>
        <!-- Map -->
        <div class="h-64 w-full md:h-80">
          <LocationMap />
        </div>

        <!-- Content -->
        <div class="grid gap-8 p-8 text-white md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div>
            <p class="mb-4 text-white/90">
              Casa Bella is located in Melbourne, Florida, just north of the Pineda Causeway with easy access to
              Interstate 95. From here, you’re about an hour from Orlando and its world-famous theme parks, just
              10 minutes from the beaches, and close to the shops and restaurants in Viera.
            </p>
            <p class="text-white/90">
              It’s a convenient place to live whether you want to spend the day at the beach, explore the parks, shop,
              or enjoy a night out at one of the area’s many restaurants.
            </p>
          </div>

          <div class="flex flex-col gap-4 border-t border-base-300 pt-4 text-sm md:border-t-0 md:border-l md:pt-0 md:pl-6">
            <div class="flex items-center gap-3">
              <span
                class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#f0ddae]"
                style="background-color: rgba(15, 23, 42, 0.9);"
                aria-hidden="true"
              >
                <!-- beach / sun icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="7" cy="7" r="3" />
                  <path d="M7 1v2M7 11v2M1 7h2M11 7h2M3.5 3.5l1.5 1.5M9 9l1.5 1.5M3.5 10.5L5 9M9 5l1.5-1.5" />
                  <path d="M4 22c1.5-3 3.5-4.5 6-4.5s4.5 1.5 6 4.5" />
                  <path d="M2 22h20" />
                </svg>
              </span>
              <p class="font-semibold text-white">10 minutes to public beach</p>
            </div>

            <div class="flex items-center gap-3">
              <span
                class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#f0ddae]"
                style="background-color: rgba(15, 23, 42, 0.9);"
                aria-hidden="true"
              >
                <!-- shopping bag icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </span>
              <p class="font-semibold text-white">10 minutes to The Avenues Viera</p>
            </div>

            <div class="flex items-center gap-3">
              <span
                class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#f0ddae]"
                style="background-color: rgba(15, 23, 42, 0.9);"
                aria-hidden="true"
              >
                <!-- airplane icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7.712 21v-1.538l2.846-2.004v-4.331L3 16.173v-1.961l7.558-5.331V4.442q0-.594.424-1.018T12 3t1.018.424t.424 1.018v4.439L21 14.21v1.962l-7.558-3.046v4.33l2.827 2.005V21L12 19.692z"/>
                </svg>
              </span>
              <p class="font-semibold text-white">45 min to MCO International Airport</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Amenities -->
  <section
    class="relative overflow-hidden py-12 px-4 bg-center text-white"
  >
    <div class="container mx-auto max-w-4xl">
      <div
        class="overflow-hidden rounded-3xl border-2 bg-black/70 shadow-[0_18px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        style="border-color: rgba(240, 221, 174, 0.35);"
      >
        <div
          class="border-b bg-black/60 px-6 py-2 md:px-8 md:py-3 backdrop-blur-xl"
          style="border-color: rgba(240, 221, 174, 0.35);"
        >
          <h2
            class="text-6xl font-normal sm:text-7xl md:text-8xl text-white"
            style="font-family: 'Adediala', 'Pinyon Script', cursive;">
            Amenities
          </h2>
        </div>
        <div class="p-8 text-white">
          <p class="mb-4 text-white/90">
            This community was designed with families in mind. The neighborhood is safe, welcoming, and easy to navigate, making it a place where neighbors know each other and kids can grow up with room to explore.
          </p>
          <p class="mb-4 text-white/90">
            One of its most valued features is the private, fenced pathway that leads directly to the nearby elementary school. Children can walk or bike to school without leaving the community, giving parents peace of mind and kids a sense of independence. It is a simple convenience that makes a big difference in daily life.
          </p>
          <p class="mb-4 text-white/90">
            At the heart of the neighborhood, you'll find a secure playground where children can play freely in a well-maintained, enclosed space. It is a natural gathering spot for families and a great way to meet neighbors.
          </p>
          <p class="mb-4 text-white/90">
            Residents also enjoy access to lighted tennis courts, perfect for an early morning match or an evening game after work. The courts are well kept and easily accessible to everyone in the community.
          </p>
          <p class="mb-4 text-white/90">
            Throughout the neighborhood, you'll notice carefully designed landscaping and grounds that are consistently maintained. Clean sidewalks, manicured green spaces, and thoughtful details create a setting that feels cared for and inviting year-round.
          </p>
          <p class="text-white/90 mb-8">
            Altogether, this is a community built for comfort, connection, and everyday ease.
          </p>

          <!-- Amenities photos: playground, clubhouse, gate -->
          <div class="grid gap-4 sm:grid-cols-3">
            <figure class="overflow-hidden rounded-lg shadow-md">
              <img
                src="/images/carousel/playground1.jpg"
                alt="Casa Bella playground"
                class="h-48 w-full object-cover"
              />
              <figcaption class="bg-white/90 px-3 py-2 text-center text-sm font-medium text-black">Playground</figcaption>
            </figure>
            <figure class="overflow-hidden rounded-lg shadow-md">
              <img
                src="/images/carousel/clubhouse1.jpg"
                alt="Casa Bella clubhouse"
                class="h-48 w-full object-cover"
              />
              <figcaption class="bg-white/90 px-3 py-2 text-center text-sm font-medium text-black">Clubhouse</figcaption>
            </figure>
            <figure class="overflow-hidden rounded-lg shadow-md">
              <img
                src="/images/carousel/tenniscourt1.jpg"
                alt="Casa Bella tennis court"
                class="h-48 w-full object-cover"
              />
              <figcaption class="bg-white/90 px-3 py-2 text-center text-sm font-medium text-black">Tennis Court</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- HOA Documents & Forms -->
  <section class="py-12 px-4">
    <div class="container mx-auto max-w-4xl">
      <h2 class="text-4xl font-normal mb-6" style="font-family: 'Adediala', 'Pinyon Script', cursive;">HOA Documents &amp; Forms</h2>
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
      <h2 class="text-4xl font-normal mb-6" style="font-family: 'Adediala', 'Pinyon Script', cursive;">HOA Links</h2>
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

  <!-- Board of Directors / Home Owners -->
  <section id="home-owners" class="py-12 px-4 scroll-mt-16">
    <div class="container mx-auto max-w-4xl">
      <h2 class="text-4xl font-normal mb-6" style="font-family: 'Adediala', 'Pinyon Script', cursive;">Board of Directors</h2>
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
            <h3 class="card-title text-2xl font-normal" style="font-family: 'Adediala', 'Pinyon Script', cursive;">{data.site.propertyManagement.name} {data.site.propertyManagement.label}</h3>
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
