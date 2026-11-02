import { useEffect, useRef } from 'react'

interface Mote { x: number; y: number; vx: number; vy: number; r: number; a: number; life: number; color: string }

const GOLD = '#c9a24e'
const bursts: Mote[] = []

// Spray a mist of particles from a viewport point. No-op under reduced motion (canvas never starts).
export function spray(x: number, y: number, color = GOLD, count = 120) {
  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.6
    const speed = 2 + Math.random() * 7
    bursts.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 1.2 + Math.random() * 3.4,
      a: 0.9,
      life: 1,
      color: Math.random() > 0.45 ? color : GOLD,
    })
  }
}

export default function GoldDust() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!matchMedia('(prefers-reduced-motion: no-preference)').matches) return
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let w = 0, h = 0, raf = 0

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = bursts.length - 1; i >= 0; i--) {
        const m = bursts[i]
        m.vx *= 0.95
        m.vy = m.vy * 0.95 + 0.03
        m.x += m.vx
        m.y += m.vy
        m.life -= 0.012
        if (m.life <= 0) { bursts.splice(i, 1); continue }
        ctx.globalAlpha = m.a * m.life
        ctx.fillStyle = m.color
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas className="dust" ref={ref} aria-hidden="true" />
}
