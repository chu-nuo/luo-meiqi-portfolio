import { useEffect, useRef } from 'react'

export default function Reveal({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        animation = node.animate(
          [
            { opacity: 0, transform: 'translateY(22px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 620, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both' },
        )
        observer.disconnect()
      },
      { threshold: 0.08 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      animation?.cancel()
    }
  }, [])

  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}
