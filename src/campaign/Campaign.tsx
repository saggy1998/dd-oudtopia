import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { SplitText } from 'gsap/SplitText'
import { ArrowUpRight } from 'lucide-react'
import { CREDITS, PERFUMES, SITE, TIKTOK } from './data'
import GoldDust from './GoldDust'
import { Booking, Drop, Gallery, MOTION, Phones, scramble, sprayFrom } from './panels'
import './campaign.css'

gsap.registerPlugin(Observer, ScrambleTextPlugin, SplitText)

export default function Campaign() {
  const root = useRef<HTMLDivElement>(null)
  const [booking, setBooking] = useState(false)
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

  // Setup: intro, cursor, magnetic buttons.
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
          .from('.stage-img img.is-active', { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.2, duration: 1.4, ease: 'expo.inOut', clearProps: 'all' }, '-=0.5')
          .from('.big-num span', { yPercent: 100, duration: 1.2 }, '<0.5')
          .from('.ptitle .w', { yPercent: 110, stagger: 0.06, duration: 1 }, '<')
          .from('.info .pi, .caption, .strip button', { y: 24, opacity: 0, stagger: 0.04, duration: 0.9, clearProps: 'transform' }, '<0.1')
          .from('.credits li', { clipPath: 'inset(0% 100% 0% 0%)', stagger: 0.05, duration: 0.9, clearProps: 'clipPath' }, '<0.2')
          .from('.badge', { scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(1.8)' }, '<0.2')
          .from('.chrome', { opacity: 0, y: (i) => (i === 0 ? -20 : 20), duration: 0.9, clearProps: 'all' }, '<')
        gsap.utils.toArray<HTMLElement>('.scramble').forEach((s) => {
          // Keep the text on the element: a re-run (StrictMode) would otherwise read the already-blanked node.
          const text = (s.dataset.text ??= s.textContent ?? '')
          s.textContent = ''
          gsap.to(s, { delay: 2.6, duration: 1.2, scrambleText: { text, chars: 'OUDTOPIA', speed: 0.5 } })
        })
      })

      mm.add(`${MOTION} and (pointer: fine)`, () => {
        const cursor = document.querySelector<HTMLElement>('.cursor')!
        const label = cursor.querySelector('span')!
        const cx = gsap.quickTo(cursor, 'x', { duration: 0.3, ease: 'power3' })
        const cy = gsap.quickTo(cursor, 'y', { duration: 0.3, ease: 'power3' })
        // Re-read the label on every move: the gallery flips between "Prev" and "Next" as you cross its middle.
        const move = (e: PointerEvent) => {
          cursor.style.opacity = '1'
          cx(e.clientX)
          cy(e.clientY)
          const t = e.target as Element
          const labelled = t.closest<HTMLElement>('[data-cursor]')
          const own = labelled && (!t.closest('a, button') || labelled.matches('button'))
          label.textContent = own ? labelled.dataset.cursor! : ''
          cursor.classList.toggle('is-view', !!own)
          cursor.classList.toggle('is-link', !own && !!t.closest('a, button'))
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

      <header className="nav chrome">
        <a className="brand" href={SITE} target="_blank" rel="noreferrer" aria-label="OudTopia website">
          <Drop className="brand-drop" />
          <span>OudTopia</span>
        </a>
        <p className="nav-tag">Campaign <i>—</i> Fragrance <i>—</i> Editorial</p>
        <button className="btn btn-dark btn-sm" data-magnetic onClick={() => setBooking(true)}>Book now</button>
      </header>

      <main className="stage">
        <aside className="info">
          <div>
            <p className="eyebrow scramble pi">Project — OudTopia</p>
            <h1 className="ptitle">Two drops. <br />One <em>utopia.</em></h1>
            <p className="lead pi">
              A campaign for two fragrances — playful, fruity Purple Drip and warm, creamy Crème Vanille Elixir —
              styled for the season of celebration.
            </p>
          </div>

          <dl className="credits">
            {CREDITS.map((c) => (
              <div key={c.role} onPointerEnter={(e) => scramble(e.currentTarget.querySelector('dd')!, c.name, 0.8)}>
                <dt>{c.role}</dt>
                <dd>{c.name}</dd>
              </div>
            ))}
            <div>
              <dt>Fragrances</dt>
              <dd className="frags">
                {PERFUMES.map((p) => (
                  <a key={p.name} href={p.url} target="_blank" rel="noreferrer" onPointerEnter={(e) => sprayFrom(e.currentTarget, p.liquid)}>
                    <span className="swatch" style={{ background: p.liquid }} />{p.name}
                  </a>
                ))}
              </dd>
            </div>
          </dl>

          <div className="ctas pi">
            <button className="btn btn-dark" data-magnetic onClick={() => setBooking(true)}>
              Book now <ArrowUpRight size={16} />
            </button>
            <a className="link-gold" href={TIKTOK} target="_blank" rel="noreferrer">
              Watch on TikTok <ArrowUpRight size={14} />
            </a>
          </div>
        </aside>

        <Gallery />
      </main>

      <footer className="bar chrome">
        <div className="bar-phones"><Phones copy={copy} copied={copied} /></div>
        <div className="bar-marquee" aria-hidden="true">
          <div className="bar-track">
            {[0, 1].map((k) => (
              <span key={k}>Purple Drip <Drop /> Crème Vanille Elixir <Drop /> Photography Marta <Drop /> Lila &amp; Hashim <Drop /> Where every drop is a utopia <Drop /></span>
            ))}
          </div>
        </div>
        <a className="bar-link" href={TIKTOK} target="_blank" rel="noreferrer">TikTok @oudtopia</a>
        <a className="bar-link" href={SITE} target="_blank" rel="noreferrer">www.oudtopia.co.uk</a>
      </footer>

      <Booking open={booking} onClose={() => setBooking(false)} copy={copy} copied={copied} />
      <p className={`toast ${copied ? 'is-on' : ''}`} role="status">{copied ? `Copied ${copied}` : ''}</p>
    </div>
  )
}
