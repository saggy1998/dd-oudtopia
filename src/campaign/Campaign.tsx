import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { SplitText } from 'gsap/SplitText'
import { CREDITS, PERFUMES, SITE, TIKTOK } from './data'
import GoldDust, { spray } from './GoldDust'
import { Drop, MOTION, Phones } from './panels'
import Sheet from './Sheet'
import './campaign.css'

gsap.registerPlugin(ScrambleTextPlugin, SplitText)

export default function Campaign() {
  const root = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(text)
      setTimeout(() => setCopied((c) => (c === text ? null : c)), 1800)
    } catch {
      // Clipboard blocked (e.g. insecure context) — the tel: link still works.
    }
  }

  // Book now: glide to the numbers (they sit beside the photos on desktop, below them on phones), then they glow gold.
  const book = () => {
    document.getElementById('contact')!.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    gsap.fromTo('.contact .phone a', { color: '#c9a24e' }, { color: '#0a0a0a', duration: 1.8, delay: 0.3, ease: 'power2.in', clearProps: 'color' })
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      SplitText.create('.ptitle', { type: 'words', mask: 'words', wordsClass: 'w' })

      const mm = gsap.matchMedia()
      mm.add(MOTION, () => {
        gsap.timeline({ defaults: { ease: 'expo.out' } })
          .fromTo('.loader .drop-ring', { strokeDashoffset: 132 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' })
          .from('.loader .drop-fill', { scale: 0, transformOrigin: '50% 70%', duration: 0.6 }, '-=0.3')
          .from('.loader-word span', { yPercent: 110, stagger: 0.035, duration: 0.7 }, '-=0.5')
          .to('.loader', { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut' }, '+=0.15')
          .set('.loader', { display: 'none' })
          .from('.portrait-media', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.4, stagger: 0.18, ease: 'expo.inOut', clearProps: 'clipPath' }, '-=0.5')
          .from('.portrait img', { scale: 1.25, duration: 1.9, stagger: 0.18, clearProps: 'transform' }, '<')
          .from('.ptitle .w', { yPercent: 110, stagger: 0.07, duration: 1.1 }, '<0.4')
          .from('.cap > *', { y: 18, opacity: 0, stagger: 0.06, duration: 0.9, clearProps: 'transform,opacity' }, '<0.3')
          .from('.pi', { y: 24, opacity: 0, stagger: 0.08, duration: 0.9, clearProps: 'transform,opacity' }, '<0.1')
          .from('.nav', { opacity: 0, y: -16, duration: 0.9, clearProps: 'transform,opacity' }, '<')
        gsap.utils.toArray<HTMLElement>('.scramble').forEach((s) => {
          // Keep the text on the element: a re-run (StrictMode) would otherwise read the already-blanked node.
          const text = (s.dataset.text ??= s.textContent ?? '')
          s.textContent = ''
          gsap.to(s, { delay: 2.4, duration: 1.2, scrambleText: { text, chars: 'OUDTOPIA', speed: 0.5 } })
        })
      })

      mm.add(`${MOTION} and (pointer: fine)`, () => {
        const cursor = document.querySelector<HTMLElement>('.cursor')!
        const cx = gsap.quickTo(cursor, 'x', { duration: 0.3, ease: 'power3' })
        const cy = gsap.quickTo(cursor, 'y', { duration: 0.3, ease: 'power3' })
        const move = (e: PointerEvent) => {
          const t = e.target as Element
          cursor.style.opacity = '1'
          cx(e.clientX)
          cy(e.clientY)
          cursor.classList.toggle('is-view', !!t.closest('.portrait-media'))
          cursor.classList.toggle('is-link', !t.closest('.portrait-media') && !!t.closest('a, button'))
        }
        window.addEventListener('pointermove', move)
        document.documentElement.classList.add('has-cursor')

        // Magnetic buttons drift toward the pointer.
        const magnets = gsap.utils.toArray<HTMLElement>('[data-magnetic]').map((el) => {
          const mx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
          const my = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
          const mm2 = (e: PointerEvent) => {
            const r = el.getBoundingClientRect()
            mx((e.clientX - r.left - r.width / 2) * 0.3)
            my((e.clientY - r.top - r.height / 2) * 0.4)
          }
          const ml = () => { mx(0); my(0) }
          el.addEventListener('pointermove', mm2)
          el.addEventListener('pointerleave', ml)
          return () => { el.removeEventListener('pointermove', mm2); el.removeEventListener('pointerleave', ml) }
        })

        return () => {
          window.removeEventListener('pointermove', move)
          document.documentElement.classList.remove('has-cursor')
          magnets.forEach((off) => off())
        }
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div className="shell" ref={root}>
      <div className="loader" aria-hidden="true">
        <Drop className="loader-drop" />
        <p className="loader-word">{'OudTopia'.split('').map((c, i) => <span key={i}>{c}</span>)}</p>
      </div>
      <GoldDust />
      <div className="cursor" aria-hidden="true"><span /></div>

      <header className="nav">
        <a className="brand" href={SITE} target="_blank" rel="noreferrer" aria-label="OudTopia website">
          <Drop className="brand-drop" />
          <span>OudTopia</span>
        </a>
        <p className="nav-mid scramble">The His &amp; Hers Edit</p>
        <button className="btn" data-magnetic onClick={book}>Book now</button>
      </header>

      <main className="page">
        <div className="intro">
          <p className="eyebrow pi">OudTopia · Lila &amp; Hashim</p>
          <h1 className="ptitle">Two drops. <br />One <em>utopia.</em></h1>
          <p className="intro-sub pi">
            Lila wears Purple Drip, Hashim wears Crème Vanille Elixir. Two OudTopia fragrances, made to be worn side by side.
          </p>
          <p className="whisper pi">Tap a photograph to meet the scent</p>
        </div>

        {/* The two photographs: side by side on desktop, one above the other on phones. Each opens its perfume. */}
        <div className="duo">
          {PERFUMES.map((p, i) => (
            <button
              className="portrait"
              key={p.id}
              style={{ '--liquid': p.liquid } as CSSProperties}
              aria-haspopup="dialog"
              aria-label={`${p.who}: ${p.name}. Open the scent`}
              onClick={(e) => {
                spray(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, p.liquid, 90)
                setOpen(p.id)
              }}
            >
              <span className="portrait-media">
                <span className="portrait-zoom">
                  <img src={p.portrait.src} alt={p.portrait.alt} width={p.portrait.w} height={p.portrait.h} style={{ objectPosition: p.portrait.pos }} fetchPriority={i === 0 ? 'high' : undefined} />
                </span>
              </span>
              <span className="cap">
                <span className="who">0{i + 1} · {p.who} · {p.model}</span>
                <span className="cap-name">{p.name}</span>
                <span className="cap-foot">
                  <span className="cap-line">{p.line}</span>
                  <span className="cap-cta">Discover</span>
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="contact pi" id="contact">
          <p className="eyebrow">Call or text to book</p>
          <Phones copy={copy} copied={copied} />
          <a className="link-gold" href={TIKTOK} target="_blank" rel="noreferrer">TikTok @oudtopia</a>
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
      </main>

      <Sheet perfume={PERFUMES.find((p) => p.id === open) ?? null} onClosed={() => setOpen(null)} copy={copy} copied={copied} />
      <p className={`toast ${copied ? 'is-on' : ''}`} role="status">{copied ? `Copied ${copied}` : ''}</p>
    </div>
  )
}
