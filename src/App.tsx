import { useState } from 'react'
import { EventDetails } from './components/EventDetails'
import { GatefoldInvitation } from './components/GatefoldInvitation'
import { InvitationControls } from './components/InvitationControls'
import { WeddingHeader } from './components/WeddingHeader'
import { WinterAtmosphere } from './components/WinterAtmosphere'

export function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="invitation-page">
      <WinterAtmosphere />
      <WeddingHeader />
      <GatefoldInvitation isOpen={isOpen} onOpen={() => setIsOpen(true)} />
      <InvitationControls isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <EventDetails isOpen={isOpen} />
    </main>
  )
}
