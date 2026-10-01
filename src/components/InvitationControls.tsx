type InvitationControlsProps = {
  isOpen: boolean
  onClose: () => void
}

export function InvitationControls({ isOpen, onClose }: InvitationControlsProps) {
  return (
    <div className="invitation-actions">
      <p className="opening-hint" id="opening-instruction" role="status">
        {isOpen ? 'Cu drag, vă invităm să ne fiți alături.' : (
          <>
            <span className="hint-arrow" aria-hidden="true">↑</span>
            <strong>Apasă pe sigiliul roșu</strong>
            <span>pentru a deschide invitația</span>
          </>
        )}
      </p>
      {isOpen ? (
        <div className="open-actions">
          <a className="details-link" href="#wedding-details">Descoperă ziua noastră <span aria-hidden="true">↓</span></a>
          <button className="replay-button" type="button" onClick={onClose}>Închide invitația <span aria-hidden="true">↶</span></button>
        </div>
      ) : null}
    </div>
  )
}
