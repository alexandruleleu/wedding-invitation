type WeddingEvent = {
  id: string
  time: string
  title: string
  venue: string
  mapUrl: string
}

type WeddingContent = {
  couple: { first: string; second: string }
  date: { iso: string; label: string }
  city: string
  tagline: string
  introduction: readonly string[]
  parents: readonly string[]
  godparents: string
  invitation: string
  rsvpDeadline: { iso: string; label: string }
  contacts: readonly { display: string; telephone: string }[]
  events: readonly WeddingEvent[]
}

// Content transcribed from the couple's two-page invitation.
export const wedding = {
  couple: { first: 'Andreea', second: 'Alexandru' },
  date: { iso: '2027-01-09', label: '9 ianuarie 2027' },
  city: 'Iași',
  tagline: 'Magia sărbătorilor rămâne cu noi încă o zi',
  introduction: [
    'Pentru că anul acesta,',
    'după toate sărbătorile iernii,',
    'urmează și a noastră.',
  ],
  parents: ['Anca-Beatrice și Ioan Ariton', 'Gabriela și Lucian Leleu'],
  godparents: 'Marius și Mădălina Olaru',
  invitation: 'vă invită să le fiți alături la celebrarea căsătoriei.',
  rsvpDeadline: { iso: '2026-12-01', label: '1 decembrie 2026' },
  contacts: [
    { display: '0763 609 655', telephone: '+40763609655' },
    { display: '0748 507 221', telephone: '+40748507221' },
  ],
  events: [
    { id: 'civil', time: '13:00', title: 'Cununia civilă', venue: 'Amouria, Iași', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Amouria+Iasi' },
    { id: 'religious', time: '15:00', title: 'Cununia religioasă', venue: 'Biserica Sf. Andrei, Iași', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Biserica+Sfantul+Andrei+Iasi' },
    { id: 'party', time: '19:00', title: 'Petrecerea', venue: 'Amouria, Iași', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Amouria+Iasi' },
  ],
} as const satisfies WeddingContent
