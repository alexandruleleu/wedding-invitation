import { useState } from 'react'
import { EventDetails } from './components/EventDetails'
import { GatefoldInvitation } from './components/GatefoldInvitation'
import { InvitationControls } from './components/InvitationControls'
import { WeddingHeader } from './components/WeddingHeader'
import { WinterAtmosphere } from './components/WinterAtmosphere'
import { SoundControl } from './components/SoundControl'
import { useWinterChimes } from './hooks/useWinterChimes'

export function App() {
  const [isOpen, setIsOpen] = useState(false)
  const sound = useWinterChimes()

  const openInvitation = () => {
    setIsOpen(true)
    sound.startOnOpen()
  }

  return (
    <main className="invitation-page">
      <WinterAtmosphere />
      <SoundControl isPlaying={sound.isPlaying} isUnavailable={sound.isUnavailable} onToggle={sound.toggle} />
      <WeddingHeader />
      <GatefoldInvitation isOpen={isOpen} onOpen={openInvitation} />
      <InvitationControls isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <EventDetails isOpen={isOpen} />
    </main>
  )
}
