export interface DocumentEntry {
  title: string;
  category?: string;
  description?: string;
  href: string;
}

export const documents: DocumentEntry[] = [
  {
    title: '2nd amended declaration of and restatement (2017)',
    category: 'Covenants, Conditions & Restrictions',
    href: '/documents/ccr.pdf'
  },
  {
    title: 'Executed January 6, 2023',
    category: 'HOA Bylaws',
    href: '/documents/bylaws.pdf'
  },
  {
    title: 'Architectural Review Application',
    description: 'Residents may use this form to apply for an exception, variance, or waiver.',
    href: '/documents/architectural-review.pdf'
  },
  {
    title: 'Clubhouse Rental Form',
    description: 'Residents may use this form to rent the clubhouse.',
    href: '/documents/clubhouse-rental.pdf'
  }
];
