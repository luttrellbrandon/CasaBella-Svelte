export type ListingStatus = 'for-sale' | 'sold';

export interface Listing {
  address: string;
  status: ListingStatus;
  price: number;
  sqft: number;
  beds: number;
  baths: number;
}

export const listings: Listing[] = [
  { address: '3220 Cappannelle Dr', status: 'for-sale', price: 940_000, sqft: 2678, beds: 3, baths: 3 },
  { address: '3298 Cappio Dr', status: 'for-sale', price: 1_050_000, sqft: 3092, beds: 4, baths: 3 },
  { address: '3350 Cappannelle Dr', status: 'for-sale', price: 1_299_900, sqft: 3407, beds: 5, baths: 4 },
  { address: '3708 Cappio Dr', status: 'sold', price: 1_617_000, sqft: 4936, beds: 4, baths: 5 },
  { address: '3350 Cappannelle Dr', status: 'for-sale', price: 902_700, sqft: 3051, beds: 4, baths: 3 },
  { address: '3266 Helmsdale Ct', status: 'for-sale', price: 774_900, sqft: 2883, beds: 5, baths: 3 }
];
