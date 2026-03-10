export interface BoardMember {
  role: string;
  name: string;
  image?: string; // e.g. '/images/board/jennifer-nagy.jpg'
}

export const board: BoardMember[] = [
  { role: 'President', name: 'Jennifer Nagy', image: '/images/board/placeholder.svg' },
  { role: 'Vice President', name: 'Tony Siminiak', image: '/images/board/placeholder.svg' },
  { role: 'Treasurer', name: 'Mark Witsaman', image: '/images/board/placeholder.svg' },
  { role: 'Secretary/Facilities', name: 'Addam Chipps', image: '/images/board/placeholder.svg' },
  { role: 'Security', name: 'Randy Carter', image: '/images/board/placeholder.svg' }
];
