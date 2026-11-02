import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Phone, X } from 'lucide-react'
import { PHONES, SHOTS, TIKTOK } from './data'
import { spray } from './GoldDust'

export const MOTION = '(prefers-reduced-motion: no-preference)'
const pad = (n: number) => String(n).padStart(2, '0')

export function Drop({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <circle className="drop-ring" cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="2" />
      <path className="drop-fill" d="M24 10c-5 7-8 11.5-8 16a8 8 0 0 0 16 0c0-4.5-3-9-8-16z" fill="currentColor" />
    </svg>
  )
}

export function Badge() {
  return (
    <div className="badge" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="badge-text">
        <defs><path id="badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1 -92 0" /></defs>
        <text><textPath href="#badge-circle" textLength="286" lengthAdjust="spacing">WHERE EVERY DROP IS A UTOPIA · OUDTOPIA ·</textPath></text>
      </svg>
      <Drop className="badge-drop" />
    </div>
  )
}

export const sprayFrom = (el: Element, color: string) => {
  const r = el.getBoundingClientRect()
  spray(r.left + r.width / 2, r.top + r.height / 2, color, 60)
}

export const scramble = (el: Element, text: string, speed = 0.6) => {
  if (!matchMedia(MOTION).matches || gsap.isTweening(el)) return
  el.textContent = ''
  gsap.to(el, { duration: 0.8, scrambleText: { text, chars: 'OUDTOPIA', speed } })
}

/* ---------------- Gallery ---------------- */
export function Gallery() {
  const [{ index, dir }, setState] = useState({ index: 0, dir: 1 })
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const prev = useRef(0)
  const shot = SHOTS[index]
  const go = (i: number, d = i > index ? 1 : -1) => setState({ index: (i + SHOTS.length) % SHOTS.length, dir: d })
  const step = (d: number) => go(index + d, d)
  const stepRef = useRef(step)
  stepRef.current = step

  // Swipe on touch screens; ← / → anywhere (except while the booking dialog is open).
  useLayoutEffect(() => {
    const obs = Observer.create({ target: stage.current, type: 'touch', tolerance: 30, lockAxis: true, onLeft: () => stepRef.current(1), onRight: () => stepRef.current(-1) })
    const key = (e: KeyboardEvent) => {
      if (document.querySelector('dialog[open]') || e.altKey || e.ctrlKey || e.metaKey) return
      if (e.key === 'ArrowRight') stepRef.current(1)
      if (e.key === 'ArrowLeft') stepRef.current(-1)
    }
    window.addEventListener('keydown', key)
    return () => { obs.kill(); window.removeEventListener('keydown', key) }
  }, [])

  useLayoutEffect(() => {
    const from = prev.current
    if (from === index) return
    prev.current = index
    if (!matchMedia(MOTION).matches) return
    const ctx = gsap.context(() => {
      const imgs = stage.current!.querySelectorAll('img')
      // Outgoing photo sinks back while the new one wipes in from the side we're travelling to.
      gsap.fromTo(imgs[from], { autoAlpha: 1, zIndex: 1 }, { autoAlpha: 0, scale: 0.92, duration: 1, ease: 'expo.inOut', clearProps: 'all' })
      gsap.fromTo(imgs[index],
        { zIndex: 2, clipPath: dir > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)', scale: 1.15 },
        { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.1, ease: 'expo.inOut', clearProps: 'all' })
      gsap.fromTo('.big-num span', { yPercent: 100 * dir }, { yPercent: 0, duration: 1, ease: 'expo.out' })
      gsap.fromTo('.cap-anim', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'expo.out', delay: 0.2 })
      scramble(root.current!.querySelector('.cap-title')!, shot.title)
    }, root)
    return () => ctx.revert()
  }, [index, dir, shot.title])

  return (
    <section className="gallery reveal" ref={root} style={{ '--tint': shot.tint } as CSSProperties} aria-roledescription="carousel" aria-label="Campaign photographs">
      <p className="big-num" aria-hidden="true"><span key={index}>{pad(index + 1)}</span></p>
      <div className="glow" aria-hidden="true" />
      <div
        className="stage-img"
        ref={stage}
        data-cursor="Next"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          e.currentTarget.dataset.cursor = e.clientX < r.left + r.width / 2 ? 'Prev' : 'Next'
        }}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          step(e.clientX < r.left + r.width / 2 ? -1 : 1)
        }}
      >
        {SHOTS.map((s, i) => (
          <img key={s.src} src={s.src} alt={i === index ? s.alt : ''} aria-hidden={i !== index} className={i === index ? 'is-active' : ''} width={s.w} height={s.h} draggable={false} fetchPriority={i === 0 ? 'high' : undefined} />
        ))}
        <Badge />
      </div>

      <div className="caption" aria-live="polite">
        <p className="cap-count"><b>{pad(index + 1)}</b> / {pad(SHOTS.length)}</p>
        <div className="cap-text">
          <p className="cap-title" key={index}>{shot.title}</p>
          <p className="cap-note cap-anim">{shot.note}</p>
        </div>
        <div className="cap-arrows">
          <button onClick={() => step(-1)} aria-label="Previous photograph" data-magnetic><ArrowLeft size={18} /></button>
          <button onClick={() => step(1)} aria-label="Next photograph" data-magnetic><ArrowRight size={18} /></button>
        </div>
      </div>

      <div className="strip" role="tablist" aria-label="Choose a photograph">
        {SHOTS.map((s, i) => (
          <button key={s.src} role="tab" aria-selected={i === index} aria-label={`${pad(i + 1)} ${s.title}`} onClick={() => go(i)}>
            <img src={s.src} alt="" width={s.w} height={s.h} />
            {/* Auto-advance: the bar's CSS animation ending moves on; paused while hovering the gallery. */}
            {i === index && <span className="autobar" key={index} onAnimationEnd={() => step(1)} />}
          </button>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Phones (bar + booking) ---------------- */
export function Phones({ copy, copied }: { copy: (text: string) => void; copied: string | null }) {
  return PHONES.map((ph) => (
    <div className="phone" key={ph.href}>
      <a href={ph.href}><Phone size={14} /> {ph.label}</a>
      <button onClick={() => copy(ph.label)} aria-label={`Copy ${ph.label}`}>
        {copied === ph.label ? <Check size={13} /> : <Copy size={13} />}
      </button>
    </div>
  ))
}

/* ---------------- Book now ---------------- */
export function Booking({ open, onClose, copy, copied }: {
  open: boolean
  onClose: () => void
  copy: (text: string) => void
  copied: string | null
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useLayoutEffect(() => {
    const d = ref.current!
    if (!open || d.open) return
    d.showModal()
    if (!matchMedia(MOTION).matches) return
    gsap.timeline()
      .fromTo(d, { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'expo.out' })
      .fromTo(d.querySelectorAll('.bk-item'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.6, ease: 'expo.out' }, 0.1)
  }, [open])

  const close = () => {
    const d = ref.current!
    if (!matchMedia(MOTION).matches) return d.close()
    gsap.to(d, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in', onComplete: () => d.close() })
  }

  return (
    <dialog
      ref={ref}
      className="booking"
      aria-labelledby="bk-title"
      onClose={onClose}
      onCancel={(e) => { e.preventDefault(); close() }}
      onClick={(e) => e.target === e.currentTarget && close()} // backdrop click
    >
      <div className="bk-inner">
        <button className="bk-close" onClick={close} aria-label="Close"><X size={18} /></button>
        <Drop className="bk-drop bk-item" />
        <p className="eyebrow bk-item">Book now</p>
        <h2 className="bk-item" id="bk-title">Call or text <em>to book.</em></h2>
        <p className="bk-text bk-item">
          Order <strong>Purple Drip</strong>, <strong>Crème Vanille Elixir</strong> or the full duo, or ask us anything about the collection.
        </p>
        <div className="bk-phones bk-item"><Phones copy={copy} copied={copied} /></div>
        <a className="btn btn-gold bk-item" href={PHONES[0].href} data-magnetic>
          <Phone size={14} /> Call {PHONES[0].label}
        </a>
        <a className="link-gold bk-item" href={TIKTOK} target="_blank" rel="noreferrer">
          Or message us on TikTok <ArrowUpRight size={14} />
        </a>
      </div>
    </dialog>
  )
}
