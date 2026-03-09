<script lang="ts">
  import { onMount } from 'svelte';
  import 'leaflet/dist/leaflet.css';

  let mapEl: HTMLDivElement;

  // Casa Bella marker from original site
  const CENTER: [number, number] = [28.210104936596554, -80.67730806345666];

  // Free tile styles (change TILE_STYLE to switch):
  // - carto_light: soft light gray
  // - carto_dark: dark theme
  // - carto_voyager: colorful, road-focused
  // - osm: classic OpenStreetMap (matches old site)
  const TILE_LAYERS = {
    carto_light: {
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      options: { maxZoom: 19, subdomains: 'abcd' },
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    },
    carto_dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      options: { maxZoom: 19, subdomains: 'abcd' },
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    },
    carto_voyager: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      options: { maxZoom: 19, subdomains: 'abcd' },
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    },
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: { maxZoom: 19 },
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  };

  const TILE_STYLE: keyof typeof TILE_LAYERS = 'osm';

  onMount(async () => {
    const leaflet = await import('leaflet');

    const map = leaflet.map(mapEl, {
      center: CENTER,
      zoom: 12,
      zoomControl: false,
      scrollWheelZoom: false,
      touchZoom: false,
      doubleClickZoom: false
    });

    const layer = TILE_LAYERS[TILE_STYLE];
    leaflet
      .tileLayer(layer.url, {
        ...layer.options,
        attribution: layer.attribution
      })
      .addTo(map);

    leaflet.marker(CENTER).addTo(map);

    return () => {
      map.remove();
    };
  });
</script>

<div
  bind:this={mapEl}
  class="h-full w-full"
  style="filter: saturate(0.4) brightness(1.15) contrast(0.98);"
/>
