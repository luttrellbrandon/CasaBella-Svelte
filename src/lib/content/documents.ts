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
    href: '/documents/reducedcovh.pdf'
  },
  {
    title: 'Executed January 6, 2023',
    category: 'HOA Bylaws',
    href: '/documents/Casabella-HOA-Amendment_BYLAWS_20230109.pdf'
  },
  {
    title: 'Architectural Review Application',
    description: 'Residents may use this form to apply for an exception, variance, or waiver.',
    href: '/documents/ARB-APPLICATION-FORM.pdf'
  },
  {
    title: 'Clubhouse Rental Form',
    description: 'Residents may use this form to rent the clubhouse.',
    href: '/documents/ClubhouseRentalGuidelines072017.docx'
  }
];
