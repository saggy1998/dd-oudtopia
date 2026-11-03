import { useState, type CSSProperties } from 'react'
import { COUPLE_GARDEN, COUPLE_STUDIO, HOTSPOTS, PERFUMES } from './data'
import { Photo, sprayFrom } from './panels'

const liquid = (c: string) => ({ '--liquid': c }) as CSSProperties

/* ---------------- 01. His & Hers story — the one move: tap the dots on the photograph ---------------- */
export function Story({ onBook }: { onBook: () => void }) {
  const [spot, setSpot] = useState<number | null>(null)

  return (
    <article className="page story" id="story">
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow scramble pi">The His &amp; Hers Edit</p>
          <h1 className="ptitle">Two drops. <br />One <em>utopia.</em></h1>
          <p className="hero-sub pi">
            Purple Drip for her, Crème Vanille Elixir for him. A story of two fragrances, styled for the season of celebration.
          </p>
          <div className="ctas pi">
            <button className="btn" data-magnetic onClick={onBook}>Book now</button>
          </div>
        </div>
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
      </section>

      <div className="pg-body">
        <header className="pg-intro">
          <p className="eyebrow rv">Chapter I · The pairing</p>
          <h2 className="pg-title split">Two drops, <em>one promise.</em></h2>
          <p className="pg-lead rv">
            Lila wears Purple Drip. Hashim wears Crème Vanille Elixir. Two OudTopia fragrances, made to be worn side by side.
          </p>
        </header>

        <div className="duet">
          {PERFUMES.map((p) => (
            <section className="voice" key={p.id} style={liquid(p.liquid)}>
              <p className="who rv">{p.who} <span>· {p.model}</span></p>
              <h3 className="voice-name split">{p.name}</h3>
              <p className="voice-line rv">{p.line}</p>
              <p className="voice-story rv">{p.story}</p>
            </section>
          ))}
        </div>

        <section className="chapter">
          <Photo shot={COUPLE_GARDEN} className="chapter-ph" />
          <div className="chapter-text">
            <p className="eyebrow rv">Chapter II · Golden hour</p>
            <h2 className="pg-title split">Worn together, <em>remembered.</em></h2>
            <p className="rv">
              Both fragrances settle onto sandalwood, amber and soft musk, so his and hers sit beautifully side by side,
              from the first look to the last dance.
            </p>
            <p className="credit-line rv">Lila &amp; Hashim · Photographed by Marta</p>
          </div>
        </section>

        <blockquote className="quote">
          <p className="split">Where every drop <em>is a utopia.</em></p>
          <cite className="rv">OudTopia</cite>
        </blockquote>
      </div>
    </article>
  )
}

/* ---------------- 02. The scent — the one move: this or that ---------------- */
export function Scent() {
  const [pick, setPick] = useState<string | null>(null)

  return (
    <article className="page scent">
      <section className={`tot ${pick ? 'is-picked' : ''}`} id="scent" aria-label="Choose his or hers">
        {PERFUMES.map((p, i) => (
          <div className={`tot-side ${pick === p.id ? 'is-on' : ''}`} key={p.id} style={liquid(p.liquid)}>
            <button
              className="tot-hit"
              aria-label={`${p.who}: ${p.name}`}
              aria-expanded={pick === p.id}
              onClick={(e) => {
                const next = pick === p.id ? null : p.id
                setPick(next)
                if (next) sprayFrom(e.currentTarget, p.liquid)
              }}
            >
              <img src={p.shots[0].src} alt={p.shots[0].alt} width={p.shots[0].w} height={p.shots[0].h} />
            </button>
            <div className="tot-text">
              <p className="tot-num">0{i + 1}</p>
              <p className="who">{p.who}</p>
              <h3 className="tot-name">{p.name}</h3>
              <div className="tot-detail" inert={pick !== p.id}>
                <div>
                  <p className="bottle-spec">{p.spec}</p>
                  <p className="bottle-about">{p.about} <em>{p.line}</em></p>
                  <dl className="notes">
                    {p.notes.map(([k, v]) => (
                      <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                    ))}
                  </dl>
                  <a className="link-gold" href={p.url} target="_blank" rel="noreferrer">View on oudtopia.co.uk</a>
                </div>
              </div>
            </div>
          </div>
        ))}
        <p className="whisper tot-whisper">{pick ? 'Tap again to compare' : 'His or hers · tap to choose'}</p>
      </section>

      <div className="pg-body">
        <header className="pg-intro">
          <p className="eyebrow rv">The scent</p>
          <h2 className="pg-title split">Two bottles, <em>one warm heart.</em></h2>
          <p className="pg-lead rv">
            Hers opens bright and floral fruity; his is a rich crème vanilla. Both dry down to sandalwood, amber and musk.
          </p>
        </header>

        <section className="still">
          <div className="still-row">
            {PERFUMES.map((p) => (
              <div key={p.id} style={liquid(p.liquid)}>
                <Photo shot={p.shots[1]} />
                <p className="still-cap rv">{p.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}
