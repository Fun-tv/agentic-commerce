import { useEffect, useRef } from 'react'

// ── useReveal ──────────────────────────────────────────────────────────────────
// Attach the returned ref to a container.
// When container enters viewport, class 'revealed' is added to the container,
// and every .reveal-child inside gets class 'visible' with staggered delay.
// CSS for .reveal-child / .visible must be defined globally (see tokens.css).
export function useReveal(threshold = 0.12) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.add('revealed')
        el.querySelectorAll('.reveal-child').forEach((child, i) => {
          child.style.transitionDelay = `${i * 80}ms`
          child.classList.add('visible')
        })
        observer.disconnect()
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
