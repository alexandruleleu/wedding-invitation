import { wedding } from '../data/wedding'

export function WeddingHeader() {
  return (
    <header className="page-heading">
      <p className="eyebrow">{wedding.tagline}</p>
      <h1>{wedding.couple.first} <span>&</span> {wedding.couple.second}</h1>
      <p className="wedding-date">
        <time dateTime={wedding.date.iso}>{wedding.date.label}</time>
        <span aria-hidden="true"> · </span>{wedding.city}
      </p>
    </header>
  )
}
