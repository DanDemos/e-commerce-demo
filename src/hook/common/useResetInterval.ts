import React, { useRef, useEffect, useCallback } from 'react'

// Implementation
export const useResetInterval = (callback?: any, delay?: any) => {
  const savedCallbackRef = useRef(callback)

  const intervalIdRef: any = useRef()

  useEffect(() => {
    savedCallbackRef.current = callback
  }, [callback])

  // handle tick
  useEffect(() => {
    const tick = () => {
      savedCallbackRef.current()
    }

    if (delay !== null) {
      intervalIdRef.current = setInterval(tick, delay)
    }

    const id = intervalIdRef.current
    return () => {
      clearInterval(id)
    }
  }, [delay])

  // handle unmount
  useEffect(() => {
    const id = intervalIdRef.current
    return () => {
      clearInterval(id)
    }
  }, [])

  const resetInterval = useCallback(() => {
    clearInterval(intervalIdRef.current)
    intervalIdRef.current = setInterval(savedCallbackRef.current, delay)
  }, [delay])

  return resetInterval
}
