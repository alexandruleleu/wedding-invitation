type SoundControlProps = {
  isPlaying: boolean
  isUnavailable: boolean
  onToggle: () => void
}

export function SoundControl({ isPlaying, isUnavailable, onToggle }: SoundControlProps) {
  return (
    <button className="sound-control" type="button" onClick={onToggle}
      aria-pressed={isPlaying} disabled={isUnavailable}
      title="Clopoței de iarnă discreți. Sunetul începe doar după o atingere.">
      <span aria-hidden="true">♪</span>
      {isUnavailable ? 'Sunet indisponibil' : isPlaying ? 'Oprește sunetul' : 'Pornește sunetul'}
    </button>
  )
}
