import type { PageServerLoad } from './$types';
import { site } from '$lib/content/site';
import { board } from '$lib/content/board';
import { documents } from '$lib/content/documents';
import { listings } from '$lib/content/listings';
import { upcomingEvents } from '$lib/content/events';

export const load: PageServerLoad = async () => {
  return {
    site,
    board,
    documents,
    listings,
    upcomingEvents
  };
};
