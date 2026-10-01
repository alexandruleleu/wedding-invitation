import { wedding } from '../data/wedding'

// Amouria hosts two events; show its map once rather than repeating the venue.
const venues = wedding.events
  .filter((event, index, events) => events.findIndex(other => other.mapUrl === event.mapUrl) === index)
  .map(event => ({
    name: event.venue,
    mapUrl: event.mapUrl,
    events: wedding.events.filter(other => other.mapUrl === event.mapUrl),
  }))

export function EventDetails({ isOpen }: { isOpen: boolean }) {
  return (
    <section className="event-details" id="wedding-details" aria-labelledby="details-heading" hidden={!isOpen}>
      <h2 className="visually-hidden" id="details-heading">Locații și contact</h2>
      <div className="visually-hidden">
        <p>{wedding.introduction.join(' ')}</p>
        <p>Împreună cu părinții {wedding.parents.join(' și ')} și nașii lor, {wedding.godparents}, {wedding.invitation}</p>
      </div>
      <div className="event-grid">
        {venues.map(venue => (
          <article key={venue.mapUrl}>
            <h3>{venue.name}</h3>
            <p>{venue.events.map(event => event.title).join(' · ')}</p>
            <ul className="visually-hidden">
              {venue.events.map(event => <li key={event.id}>{event.title}: <time dateTime={event.time}>{event.time}</time></li>)}
            </ul>
            <a href={venue.mapUrl} target="_blank" rel="noreferrer" aria-label={`Vezi locația: ${venue.name}`}>Vezi locația <span aria-hidden="true">↗</span></a>
          </article>
        ))}
      </div>
      <section className="rsvp" aria-labelledby="rsvp-heading">
        <h3 id="rsvp-heading">Confirmă prezența</h3>
        <p className="visually-hidden">Vă rugăm să confirmați prezența până la <time dateTime={wedding.rsvpDeadline.iso}>{wedding.rsvpDeadline.label}</time>.</p>
        <div className="phone-links">
          {wedding.contacts.map(contact => <a key={contact.telephone} href={`tel:${contact.telephone}`} aria-label={`Sună la ${contact.display}`}>{contact.display}</a>)}
        </div>
      </section>
    </section>
  )
}
