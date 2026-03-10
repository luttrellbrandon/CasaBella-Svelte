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

  /** Start hero signature animation only after font is loaded so iOS paints full glyphs (C/B/L). */
  let signatureReady = $state(false);

  onMount(() => {
    const heroId = setInterval(() => {
      showFirst = !showFirst;
    }, HERO_INTERVAL_MS);
    const carouselId = setInterval(() => {
      carouselIndexRef.current = (carouselIndexRef.current + 1) % CAROUSEL_IMAGES.length;
      carouselIndex = carouselIndexRef.current;
    }, CAROUSEL_INTERVAL_MS);

    const startSignature = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          signatureReady = true;
        });
      });
    };
    document.fonts.ready.then(startSignature);
    setTimeout(startSignature, 800);

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

  const events = $derived(data.upcomingEvents ?? []);
  let eventsCarouselIndex = $state(0);
  function eventsCarouselPrev() {
    eventsCarouselIndex = (eventsCarouselIndex - 1 + events.length) % events.length;
  }
  function eventsCarouselNext() {
    eventsCarouselIndex = (eventsCarouselIndex + 1) % events.length;
  }

  function formatPrice(n: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  }
</script>

<main class="flex-1">
  <!-- Hero: background images fade on timer, overlay, title and nav buttons -->
  <section class="relative min-h-screen w-full bg-base-300 flex items-center justify-center overflow-x-hidden overflow-y-visible">
    <img
      src="/images/hero2.jpg"
      alt="Casa Bella community at dusk — fountain and pond"
      class="absolute inset-0 h-full w-full object-cover transition-opacity duration-[3000ms] ease-in-out {showFirst ? 'opacity-100' : 'opacity-0'}"
      aria-hidden="{!showFirst}"
    />
    <img
      src="/images/hero.jpg"
      alt="Casa Bella community — lake, fountain, and residential neighborhood"
      class="absolute inset-0 h-full w-full object-cover transition-opacity duration-[3000ms] ease-in-out {showFirst ? 'opacity-0' : 'opacity-100'}"
      aria-hidden="{showFirst}"
    />
    <div class="absolute inset-0 bg-black/50" aria-hidden="true"></div>
    <div class="absolute bottom-0 left-0 right-0 z-[5] h-40 bg-gradient-to-t from-black via-black/80 to-transparent" aria-hidden="true"></div>
    <div
      class="relative z-10 flex flex-col items-center justify-center gap-6 px-4 pt-[env(safe-area-inset-top)] py-12 pb-16 text-center min-h-screen"
      class:hero-signature-ready={signatureReady}
    >
      <div class="hero-signature flex-[0_0_auto]" aria-label={data.site?.title ?? 'Casa Bella'}>
        <svg
          viewBox="-50 -100 900 400"
          class="w-[22rem] sm:w-[28rem] md:w-[34rem] lg:w-[40rem] max-w-[90vw]"
          style="overflow: visible;"
          role="img"
          aria-hidden="true"
        >
          <text
            x="50%"
            y="52%"
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

  <!-- Upcoming Events -->
  {#if events.length > 0}
    <section class="relative overflow-hidden py-12 px-4 bg-center text-white">
      <div class="container relative z-10 mx-auto max-w-4xl">
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
              Upcoming Events
            </h2>
          </div>
          <div class="p-8 text-white">
            <div class="relative overflow-hidden rounded-lg bg-black/30">
              {#each events as event, i}
                <div
                  class="transition-opacity duration-300 ease-in-out {i === eventsCarouselIndex ? 'opacity-100 block' : 'opacity-0 hidden'}"
                  role="tabpanel"
                  aria-hidden={i !== eventsCarouselIndex}
                >
                  <div class="rounded-xl border border-white/20 bg-black/40 p-6 sm:p-8">
                    <p class="text-sm font-medium text-[#f0ddae]/90 uppercase tracking-wide">{event.date}</p>
                    <h3 class="text-2xl font-bold text-white mt-1">{event.title}</h3>
                    {#if event.location}
                      <p class="text-white/80 mt-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-[#f0ddae]/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </p>
                    {/if}
                    {#if event.description}
                      <p class="text-white/90 mt-3">{event.description}</p>
                    {/if}
                  </div>
                </div>
              {/each}
              <button
                type="button"
                class="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 disabled:opacity-50"
                aria-label="Previous event"
                onclick={eventsCarouselPrev}
                disabled={events.length <= 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                class="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 disabled:opacity-50"
                aria-label="Next event"
                onclick={eventsCarouselNext}
                disabled={events.length <= 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {#if events.length > 1}
                <div class="flex justify-center gap-2 pt-4">
                  {#each events as _, i}
                    <button
                      type="button"
                      class="h-2 w-2 rounded-full transition {i === eventsCarouselIndex ? 'bg-[#f0ddae] scale-125' : 'bg-white/50 hover:bg-white/80'}"
                      aria-label="Go to event {i + 1}"
                      onclick={() => { eventsCarouselIndex = i; }}
                    ></button>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </section>
  {/if}

  <!-- HOA Documents & Forms -->
  <section
    class="relative overflow-hidden py-12 px-4 bg-center text-white"
  >
    <div class="container relative z-10 mx-auto max-w-4xl">
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
            Documents &amp; Links
          </h2>
        </div>
        <div class="p-8 text-white">
          <p class="mb-6 text-white/90">
            Official HOA documents and forms for Casa Bella residents. Download covenants, bylaws, and request forms below.
          </p>
          <div class="space-y-4">
            {#each data.documents ?? [] as doc}
              <a
                href={doc.href}
                class="flex flex-col gap-1 rounded-lg border border-white/20 bg-black/40 px-4 py-3 transition hover:border-[rgba(240,221,174,0.5)] hover:bg-black/50"
                target="_blank"
                rel="noopener noreferrer"
              >
                {#if doc.category}
                  <span class="text-sm text-[#f0ddae]/90">{doc.category}</span>
                {/if}
                <span class="text-lg font-bold text-white">{doc.title}</span>
                {#if doc.description}
                  <span class="text-sm text-white/80">{doc.description}</span>
                {/if}
                <span class="mt-1 inline-flex items-center gap-1 text-base font-bold text-[#f0ddae]" aria-hidden="true">
                  Download
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </span>
              </a>
            {/each}
          </div>

          {#if data.site?.social?.facebook}
            <div class="mt-8 border-t border-white/20 pt-6">
              <p class="mb-3 text-sm font-medium text-[#f0ddae]/90">Community links</p>
              <div class="flex flex-wrap gap-3">
                <a
                  href={data.site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/40 px-4 py-2.5 text-white transition hover:border-[rgba(240,221,174,0.5)] hover:bg-black/50"
                  aria-label="Visit our Facebook page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- Board of Directors / Home Owners -->
  <section id="home-owners" class="relative overflow-hidden py-12 px-4 bg-center text-white scroll-mt-16">
    <div class="container relative z-10 mx-auto max-w-4xl">
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
            Board of Directors
          </h2>
        </div>
        <div class="p-8 text-white">
          <div class="grid gap-6 sm:grid-cols-2">
            {#each data.board ?? [] as member}
              <div class="flex items-center gap-4 rounded-xl border border-white/20 bg-black/40 p-4">
                <figure class="shrink-0 h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                  {#if member.image}
                    <img
                      src={member.image}
                      alt=""
                      class="h-full w-full object-cover"
                    />
                  {:else}
                    <span class="text-2xl sm:text-3xl font-semibold text-white/50" aria-hidden="true">
                      {member.name.split(/\s+/).slice(0, 2).map((n) => n[0]).join('')}
                    </span>
                  {/if}
                </figure>
                <div class="min-w-0">
                  <h3 class="font-semibold text-[#f0ddae]">{member.role}</h3>
                  <p class="font-medium text-white">{member.name}</p>
                </div>
              </div>
            {/each}
          </div>
          <a href="mailto:board@casabellahoa.net" class="btn btn-outline border-[rgba(240,221,174,0.5)] text-white hover:bg-white/10 mt-6">Email the Board</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Meetings & Property Management -->
  <section class="relative overflow-hidden py-12 px-4 bg-center text-white">
    <div class="container relative z-10 mx-auto max-w-4xl">
      <div
        class="overflow-hidden rounded-3xl border-2 bg-black/70 shadow-[0_18px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        style="border-color: rgba(240, 221, 174, 0.35);"
      >
        <div class="p-8 text-white">
          <p class="mb-6 text-lg text-white/90">{data.site?.meetingNote}</p>
          {#if data.site?.propertyManagement}
            <div class="rounded-xl border border-white/20 bg-black/40 p-6">
              <h3 class="text-2xl font-normal mb-3 text-white" style="font-family: 'Adediala', 'Pinyon Script', ">{data.site.propertyManagement.name} {data.site.propertyManagement.label}</h3>
              <p class="text-white/90">{data.site.propertyManagement.address}</p>
              <p><a href="tel:+13217848011" class="link text-[#f0ddae] hover:text-[#f0ddae]/80">{data.site.propertyManagement.phone}</a></p>
              <p class="text-sm text-white/80 mt-2">{data.site.propertyManagement.hours.weekdays}</p>
              <p class="text-sm text-white/80">{data.site.propertyManagement.hours.friday}</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </section>
</main>
