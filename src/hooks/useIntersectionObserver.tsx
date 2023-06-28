import { useState, useEffect } from 'react'

interface IntersectionObserverOptions {
  threshold: number
}

// https://www.30secondsofcode.org/react/s/use-intersection-observer/
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const useIntersectionObserver = (
  ref: React.MutableRefObject<HTMLElement | null>,
  options: IntersectionObserverOptions
) => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setIsIntersecting(entries[0].isIntersecting)
    }, options)

    const currentObserverTarget = ref.current

    if (currentObserverTarget) {
      observer.observe(currentObserverTarget)
    }

    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget)
      }
    }
  }, [ref, options])

  return { isIntersecting }
}

export default useIntersectionObserver
