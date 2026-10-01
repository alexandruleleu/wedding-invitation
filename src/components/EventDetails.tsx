import { wedding } from '../data/wedding'

export function EventDetails({ isOpen }: { isOpen: boolean }) {
  return (
    <section className="event-details" id="wedding-details" aria-labelledby="details-heading" hidden={!isOpen}>
      <p className="eyebrow">{wedding.tagline}</p>
      <h2 id="details-heading"><time dateTime={wedding.date.iso}>{wedding.date.label}</time></h2>
      <p className="wedding-story">
        {wedding.introduction.map(line => <span className="text-line" key={line}>{line}</span>)}
      </p>
      <div className="event-grid">
        {wedding.events.map(event => (
          <article key={event.id}>
            <time className="event-time" dateTime={event.time}>{event.time}</time>
            <h3>{event.title}</h3>
            <p>{event.venue}</p>
            <a href={event.mapUrl} target="_blank" rel="noreferrer">Vezi locația <span aria-hidden="true">↗</span></a>
          </article>
        ))}
      </div>
      <div className="family-note">
        <p>Împreună cu părinții</p>
        <p>{wedding.parents.map(names => <span className="text-line" key={names}>{names}</span>)}</p>
        <p>și nașii lor, <strong>{wedding.godparents}</strong>,<br />{wedding.invitation}</p>
      </div>
      <section className="rsvp" aria-labelledby="rsvp-heading">
        <span aria-hidden="true" className="tiny-heart">♡</span>
        <h3 id="rsvp-heading">Confirmarea prezenței</h3>
        <p>Vă rugăm să confirmați prezența până la <strong><time dateTime={wedding.rsvpDeadline.iso}>{wedding.rsvpDeadline.label}</time></strong>.</p>
        <div className="phone-links">
          {wedding.contacts.map(contact => <a key={contact.telephone} href={`tel:${contact.telephone}`}>{contact.display}</a>)}
        </div>
      </section>
    </section>
  )
}
