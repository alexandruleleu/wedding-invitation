type InvitationControlsProps = {
  isOpen: boolean
  onClose: () => void
}

export function InvitationControls({ isOpen, onClose }: InvitationControlsProps) {
  return (
    <div className="invitation-actions">
      <p className={isOpen ? 'visually-hidden' : 'opening-hint'} id="opening-instruction" role="status">
        {isOpen ? 'Invitația este deschisă.' : (
          <>
            <span className="hint-arrow" aria-hidden="true">↑</span>
            <strong>Apasă pe sigiliul roșu</strong>
            <span>pentru a deschide invitația</span>
          </>
        )}
      </p>
      {isOpen ? (
        <div className="open-actions">
          <a className="details-link" href="#wedding-details">Locații și contact <span aria-hidden="true">↓</span></a>
          <button className="replay-button" type="button" onClick={onClose}>Închide invitația <span aria-hidden="true">↶</span></button>
          <a className="artwork-link" href="/images/invitation-inside.webp" target="_blank" rel="noreferrer">Mărește invitația <span aria-hidden="true">↗</span></a>
        </div>
      ) : null}
    </div>
  )
}
