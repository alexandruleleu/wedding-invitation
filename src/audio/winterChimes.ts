// An original C-major winter waltz: a lilting melody over soft triads, with
// harmonic overtones rather than metallic bells. Native rendering runs once.
const measures = [
  { chord: [48, 52, 55], melody: [72, 76, 79] },
  { chord: [45, 48, 52], melody: [81, 79, 76] },
  { chord: [41, 45, 48], melody: [77, 81, 79] },
  { chord: [43, 47, 50], melody: [74, 79, 77] },
  { chord: [48, 52, 55], melody: [76, 79, 84] },
  { chord: [43, 47, 50], melody: [83, 79, 74] },
  { chord: [41, 45, 48], melody: [77, 76, 74] },
  { chord: [48, 52, 55], melody: [76, 74, 72] },
  { chord: [48, 52, 55], melody: [76, 79, 84] },
  { chord: [45, 48, 52], melody: [81, 79, 76] },
  { chord: [41, 45, 48], melody: [77, 81, 84] },
  { chord: [43, 47, 50], melody: [83, 79, 77] },
  { chord: [48, 52, 55], melody: [76, 79, 84] },
  { chord: [41, 45, 48], melody: [81, 77, 76] },
  { chord: [43, 47, 50], melody: [74, 77, 71] },
  { chord: [48, 52, 55], melody: [76, 74, 72] },
] as const

const beatDuration = 0.6
const measureDuration = beatDuration * 3
const leadIn = 0.4
const loopDuration = 33
const voices = [
  { ratio: 1, level: 0.32, attack: 0.08 },
  { ratio: 2, level: 0.055, attack: 0.1 },
  { ratio: 3, level: 0.008, attack: 0.12 },
] as const

async function renderChimes(sampleRate: number): Promise<AudioBuffer> {
  const offline = new OfflineAudioContext(1, sampleRate * loopDuration, sampleRate)
  const addTone = (midi: number, start: number, level: number, attack: number, decay: number, ratio = 1) => {
    const oscillator = offline.createOscillator()
    const envelope = offline.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12) * ratio
    envelope.gain.setValueAtTime(0, start)
    envelope.gain.linearRampToValueAtTime(level, start + attack)
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + decay)
    envelope.gain.linearRampToValueAtTime(0, start + decay + 0.15)
    oscillator.connect(envelope).connect(offline.destination)
    oscillator.start(start)
    oscillator.stop(start + decay + 0.2)
  }

  for (const [measureIndex, measure] of measures.entries()) {
    const start = leadIn + measureIndex * measureDuration
    for (const midi of measure.chord) addTone(midi, start, 0.035, 0.4, 2.4)
    for (const [beat, midi] of measure.melody.entries()) {
      const isFinalNote = measureIndex === measures.length - 1 && beat === 2
      for (const { ratio, level, attack } of voices) {
        addTone(midi, start + beat * beatDuration, level, attack, isFinalNote ? 3.2 : 1.6, ratio)
      }
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
