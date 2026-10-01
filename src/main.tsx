import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

function Invitation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="invitation-page">
      <header className="page-heading">
        <p className="eyebrow">With love, for you</p>
        <h1>A little invitation.<br />A very special day.</h1>
        <p>Every beautiful story deserves a beautiful beginning.</p>
      </header>

      <div className={`envelope ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
        <div className="envelope-back" />
        <div className="letter">
          <span className="letter-ornament">❦</span>
          <span className="eyebrow">Together with our families</span>
          <span className="letter-title">Our wedding</span>
          <span className="letter-rule" />
          <span className="letter-copy">We would love to celebrate<br />this moment with you.</span>
          <span className="letter-signoff">An invitation to remember</span>
        </div>
        <div className="envelope-front" />
        <div className="envelope-flap" />
        <span className="seal">♡</span>
      </div>

      <section className="invitation-actions" aria-label="Invitation controls">
        <button type="button" aria-expanded={isOpen} aria-controls="invitation-message" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close the invitation' : 'Open your invitation'}
          <span aria-hidden="true">{isOpen ? '↶' : '↗'}</span>
        </button>
        <p id="invitation-message" role="status">
          {isOpen ? 'Our invitation, made with love.' : 'A small moment of anticipation.'}
        </p>
      </section>

      <footer>Design preview · Your invitation image and wedding details will be added next.</footer>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><Invitation /></StrictMode>)
