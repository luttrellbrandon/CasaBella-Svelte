export interface UpcomingEvent {
  title: string;
  date: string;
  description?: string;
  location?: string;
}

export const upcomingEvents: UpcomingEvent[] = [
  {
    title: 'Upcoming Event 1',
    date: 'TBD',
    description: 'Event details to be announced.',
    location: 'TBD'
  },
  {
    title: 'Upcoming Event 2',
    date: 'TBD',
    description: 'Event details to be announced.',
    location: 'TBD'
  },
  {
    title: 'Upcoming Event 3',
    date: 'TBD',
    description: 'Event details to be announced.',
    location: 'TBD'
  }
];
