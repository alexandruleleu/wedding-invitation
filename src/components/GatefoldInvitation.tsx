import { wedding } from '../data/wedding'

type GatefoldInvitationProps = {
  isOpen: boolean
  onOpen: () => void
}

export function GatefoldInvitation({ isOpen, onOpen }: GatefoldInvitationProps) {
  return (
    <section className={`paper-stage ${isOpen ? 'is-open' : ''}`} aria-label="Invitația noastră de nuntă">
      <div className="gatefold">
        <div className="paper-centre" aria-hidden="true" />
        <div className="fold fold-left" aria-hidden="true">
          <div className="fold-face fold-outside" />
          <div className="fold-face fold-inside" />
        </div>
        <div className="fold fold-right" aria-hidden="true">
          <div className="fold-face fold-outside" />
          <div className="fold-face fold-inside" />
        </div>
        <button className="wax-seal" type="button" tabIndex={isOpen ? -1 : 0}
          aria-hidden={isOpen} aria-expanded={isOpen} aria-controls="wedding-details"
          aria-describedby={isOpen ? undefined : 'opening-instruction'}
          aria-label={`Deschide invitația ${wedding.couple.first} și ${wedding.couple.second}`}
          onClick={onOpen}>
          <img src="/images/wax-seal.webp" alt="" width="400" height="414" />
        </button>
      </div>
    </section>
  )
}
