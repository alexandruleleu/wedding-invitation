// Original, warm pentatonic winter tones: lower pitches, slow attacks and
// overlapping fades instead of bright, percussive bells. Rendered only once.
const notes = [
  [0.6, 196], [6, 293.66], [11.4, 246.94], [16.8, 220],
  [22.2, 293.66], [27.6, 196], [33, 246.94], [38.4, 220],
  [43.8, 293.66], [49.2, 196],
] as const

const voices = [
  { ratio: 1, level: 0.42, attack: 1.4, decay: 9 },
  { ratio: 2, level: 0.035, attack: 1.8, decay: 6.5 },
] as const

async function renderChimes(sampleRate: number): Promise<AudioBuffer> {
  const offline = new OfflineAudioContext(1, sampleRate * 60, sampleRate)
  for (const [start, frequency] of notes) {
    for (const { ratio, level, attack, decay } of voices) {
      const oscillator = offline.createOscillator()
      const envelope = offline.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.value = frequency * ratio
      envelope.gain.setValueAtTime(0, start)
      envelope.gain.linearRampToValueAtTime(level, start + attack)
      envelope.gain.exponentialRampToValueAtTime(0.0001, start + decay)
      envelope.gain.linearRampToValueAtTime(0, start + decay + 0.15)
      oscillator.connect(envelope).connect(offline.destination)
      oscillator.start(start)
      oscillator.stop(start + decay + 0.2)
    }
  }
  return offline.startRendering()
}

export class WinterChimes {
  private readonly context: AudioContext
  private readonly master: GainNode
  private buffer: Promise<AudioBuffer> | undefined
  private source: AudioBufferSourceNode | undefined
  private wantsPlayback = false
  private disposed = false

  constructor() {
    const AudioContextConstructor = window.AudioContext
      ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioContextConstructor || !window.OfflineAudioContext) {
      throw new Error('Audio is not supported by this browser.')
    }
    this.context = new AudioContextConstructor()
    this.master = this.context.createGain()
    this.master.gain.value = 0.06
    this.master.connect(this.context.destination)
  }

  async play(): Promise<boolean> {
    if (this.disposed) return false
    this.wantsPlayback = true
    // Called directly from a seal/control tap, before awaiting audio rendering.
    await this.context.resume()
    this.buffer ??= renderChimes(Math.min(this.context.sampleRate, 24000))
    const buffer = await this.buffer
    if (!this.wantsPlayback || this.disposed) return false
    if (!this.source) {
      this.source = this.context.createBufferSource()
      this.source.buffer = buffer
      this.source.loop = true
      this.source.connect(this.master)
      this.source.start()
    }
    return this.context.state === 'running'
  }

  pause(): void {
    this.wantsPlayback = false
    if (!this.disposed) void this.context.suspend().catch(() => {})
  }

  dispose(): void {
    if (this.disposed) return
    this.wantsPlayback = false
    this.disposed = true
    try { this.source?.stop() } catch { /* A source may fail before it starts. */ }
    this.source?.disconnect()
    this.master.disconnect()
    void this.context.close().catch(() => {})
  }
}
