// An original, sparse pentatonic score. Native audio rendering keeps work off
// the React render loop and avoids downloading a track or calling a service.
const notes = [
  [0.4, 392], [4.2, 587.33], [8.3, 493.88], [12.1, 440],
  [16.3, 659.25], [20.2, 587.33], [24.5, 392], [28.3, 493.88],
  [32.2, 440], [36.4, 659.25], [40.2, 587.33], [44.1, 493.88],
  [48.3, 392], [52.1, 440],
] as const

async function renderChimes(sampleRate: number): Promise<AudioBuffer> {
  const offline = new OfflineAudioContext(1, sampleRate * 60, sampleRate)
  for (const [start, frequency] of notes) {
    for (const [ratio, level, decay] of [[1, 0.5, 4.8], [2, 0.13, 2.2], [2.76, 0.025, 1.1]]) {
      const oscillator = offline.createOscillator()
      const envelope = offline.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.value = frequency * ratio
      envelope.gain.setValueAtTime(0, start)
      envelope.gain.linearRampToValueAtTime(level, start + 0.05)
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
    this.master.gain.value = 0.08
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
