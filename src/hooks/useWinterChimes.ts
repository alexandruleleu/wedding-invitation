import { useCallback, useEffect, useRef, useState } from 'react'
import { WinterChimes } from '../audio/winterChimes'

export function useWinterChimes() {
  const engine = useRef<WinterChimes | null>(null)
  const muted = useRef(false)
  const attempt = useRef(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isUnavailable, setIsUnavailable] = useState(false)

  const start = useCallback(async () => {
    const currentAttempt = ++attempt.current
    try {
      engine.current ??= new WinterChimes()
      const playing = await engine.current.play()
      if (attempt.current === currentAttempt) setIsPlaying(playing)
    } catch {
      if (attempt.current === currentAttempt) {
        engine.current?.dispose()
        engine.current = null
        setIsPlaying(false)
        setIsUnavailable(true)
      }
    }
  }, [])

  const pause = useCallback(() => {
    ++attempt.current
    engine.current?.pause()
    setIsPlaying(false)
  }, [])

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) pause()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      ++attempt.current
      engine.current?.dispose()
      engine.current = null
    }
  }, [pause])

  const startOnOpen = () => {
    if (!muted.current && !isUnavailable) void start()
  }

  const toggle = () => {
    if (isPlaying) {
      muted.current = true
      pause()
    } else {
      muted.current = false
      void start()
    }
  }

  return { isPlaying, isUnavailable, startOnOpen, toggle }
}
