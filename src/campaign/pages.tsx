import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { COUPLE_STUDIO, CREDITS, HOTSPOTS, PERFUMES, SITE, TIKTOK } from './data'
import { Phones, sprayFrom } from './panels'

const liquid = (c: string) => ({ '--liquid': c }) as CSSProperties

/* 01. His & Hers story — the one move: tap the dots on the photograph */
export function Story() {
  const [spot, setSpot] = useState<number | null>(null)

  return (
    <section className="pane pane-story" id="story" aria-label="His & Hers story">
      <figure className="ph hero-ph" onClick={() => setSpot(null)}>
        <img src={COUPLE_STUDIO.src} alt={COUPLE_STUDIO.alt} width={COUPLE_STUDIO.w} height={COUPLE_STUDIO.h} fetchPriority="high" />
        <figcaption className="ph-cap">Lila &amp; Hashim · Photographed by Marta</figcaption>
        {HOTSPOTS.map((h, i) => (
          <button
            className={`spot ${spot === i ? 'is-open' : ''}`}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            key={h.role}
            aria-label={`${h.role}: ${h.name}`}
            aria-pressed={spot === i}
            onClick={(e) => { e.stopPropagation(); setSpot(spot === i ? null : i) }}
          />
        ))}
        {/* One caption place, like a magazine credit: the hint gives way to whichever detail is tapped. */}
        <div className="hero-reveal" aria-live="polite">
          {spot === null
            ? <p className="whisper" key="hint">Tap the dots to reveal</p>
            : <p key={spot}><span>{HOTSPOTS[spot].role}</span>{HOTSPOTS[spot].name}</p>}
        </div>
      </figure>

      <div className="hero-text">
        <p className="eyebrow scramble pi">The His &amp; Hers Edit</p>
        <h1 className="ptitle">Two drops. <br />One <em>utopia.</em></h1>
        <p className="hero-sub pi">
          Lila wears Purple Drip, Hashim wears Crème Vanille Elixir. Two OudTopia fragrances, made to be worn side by side.
        </p>
        <p className="whisper swipe-hint pi" aria-hidden="true">Scroll for the scent</p>
      </div>
    </section>
  )
}

/* 02. The scent — the one move: this or that. Tap a bottle, or drag the line between them. */
type Pick = string | null
const ORDER: Pick[] = ['his', null, 'hers'] // the line, left to right: further right shows more of hers (left side)

export function Scent({ copy, copied }: { copy: (text: string) => void; copied: string | null }) {
  const [pick, setPick] = useState<Pick>(null)
  const tot = useRef<HTMLDivElement>(null)

  const choose = (next: Pick, from: Element) => {
    setPick(next)
    if (next) sprayFrom(from, PERFUMES.find((p) => p.id === next)!.liquid)
  }

  // Drag the line: the two photos share the width live, and letting go past a third picks that side.
  const drag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = tot.current!
    const handle = e.currentTarget
    const r = el.getBoundingClientRect()
    let s = 0.5
    let moved = false
    e.preventDefault() // no text selection or native drag, which would cancel the pointer
    handle.setPointerCapture(e.pointerId)
    const move = (ev: PointerEvent) => {
      if (!moved) el.classList.add('is-dragging')
      moved = true
      s = Math.min(0.92, Math.max(0.08, (ev.clientX - r.left) / r.width))
      el.style.setProperty('--split', String(s))
    }
    const up = (ev: PointerEvent) => {
      handle.removeEventListener('pointermove', move)
      handle.removeEventListener('pointerup', up)
      handle.removeEventListener('pointercancel', up)
      el.classList.remove('is-dragging')
      el.style.removeProperty('--split') // the class value takes over and the line glides there
      if (moved && ev.type === 'pointerup') choose(s > 0.66 ? 'hers' : s < 0.34 ? 'his' : null, handle)
    }
    handle.addEventListener('pointermove', move)
    handle.addEventListener('pointerup', up)
    handle.addEventListener('pointercancel', up)
  }

  const key = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    const i = ORDER.indexOf(pick) + step
    if (!step || i < 0 || i >= ORDER.length) return
    e.preventDefault()
    choose(ORDER[i], e.currentTarget)
  }

  return (
    <section className="pane pane-scent" id="scent" aria-label="The scent">
      <div className={`tot pi ${pick ? `is-picked pick-${pick}` : ''}`} ref={tot} role="group" aria-label="Choose his or hers">
        {PERFUMES.map((p, i) => (
          <div className={`tot-side ${pick === p.id ? 'is-on' : ''} ${p.shots[0].dark ? 'is-dark' : ''}`} key={p.id} style={liquid(p.liquid)}>
            <button
              className="tot-hit"
              aria-label={`${p.who}: ${p.name}`}
              aria-expanded={pick === p.id}
              onClick={(e) => choose(pick === p.id ? null : p.id, e.currentTarget)}
            >
              <img src={p.shots[0].src} alt={p.shots[0].alt} width={p.shots[0].w} height={p.shots[0].h} style={{ objectPosition: p.shots[0].pos }} />
            </button>
            <div className="tot-text">
              <p className="tot-num">0{i + 1}</p>
              <p className="who">{p.who}</p>
              <div className="tot-lead"><p>{p.line}</p></div>
              <h2 className="tot-name">{p.name}</h2>
              <div className="tot-detail" inert={pick !== p.id}>
                <div>
                  <p className="bottle-spec">{p.spec}</p>
                  <dl className="notes">
                    {p.notes.map(([k, v]) => (
                      <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                    ))}
                  </dl>
                  <a className="link-gold" href={p.url} target="_blank" rel="noreferrer">Shop the scent</a>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div
          className="tot-line"
          role="slider"
          tabIndex={0}
          aria-label="Slide between hers and his"
          aria-valuemin={0}
          aria-valuemax={2}
          aria-valuenow={ORDER.indexOf(pick)}
          aria-valuetext={pick ? PERFUMES.find((p) => p.id === pick)!.name : 'Both'}
          onPointerDown={drag}
          onKeyDown={key}
        ><span /></div>
        <p className="whisper tot-whisper">{pick ? 'Tap again to compare' : 'Drag the line or tap · his or hers'}</p>
      </div>

      <div className="contact pi" id="contact">
        <p className="eyebrow">Call or text to book</p>
        <div className="contact-row">
          <Phones copy={copy} copied={copied} />
          <a className="link-gold" href={TIKTOK} target="_blank" rel="noreferrer">TikTok @oudtopia</a>
        </div>
      </div>

      <footer className="foot pi">
        <dl className="credits">
          {CREDITS.map((c) => (
            <div key={c.role}><dt>{c.role}</dt><dd>{c.name}</dd></div>
          ))}
        </dl>
        <p className="foot-row">
          <a href={SITE} target="_blank" rel="noreferrer">www.oudtopia.co.uk</a>
          <span>© 2026 OudTopia</span>
        </p>
      </footer>
    </section>
  )
}
