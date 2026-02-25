import type { PageServerLoad } from './$types';
import { site } from '$lib/content/site';
import { board } from '$lib/content/board';
import { documents } from '$lib/content/documents';
import { links } from '$lib/content/links';
import { listings } from '$lib/content/listings';

export const load: PageServerLoad = async () => {
  return {
    site,
    board,
    documents,
    links,
    listings
  };
};
