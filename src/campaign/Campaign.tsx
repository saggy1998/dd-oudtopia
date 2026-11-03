import { useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { SplitText } from 'gsap/SplitText'
import { CREDITS, SITE, TIKTOK } from './data'
import GoldDust from './GoldDust'
import { Drop, MOTION, Phones } from './panels'
import { Scent, Story } from './pages'
import './campaign.css'

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, SplitText)

// Glide to a part of the page; nothing opens, nothing jumps.
const scrollTo = (id: string) => document.getElementById(id)!.scrollIntoView({ behavior: 'smooth' })

// Words rise out of masks and .rv items fade up as they scroll into view.
function reveal(scope: string) {
  gsap.utils.toArray<HTMLElement>(`${scope} .split`).forEach((el) => {
    const { words } = SplitText.create(el, { type: 'words', mask: 'words' })
    gsap.from(words, { yPercent: 110, stagger: 0.05, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
  })
  ScrollTrigger.batch(`${scope} .rv`, {
    start: 'top 92%',
    once: true,
    onEnter: (els) => gsap.fromTo(els, { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 1, ease: 'expo.out', overwrite: true }),
  })
  gsap.set(`${scope} .rv`, { opacity: 0 })
  // The opening photograph of each half has its own entrance and never drifts.
  gsap.utils.toArray<HTMLElement>(`${scope} .pg-body .ph img`).forEach((img) => {
    gsap.from(img, { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.12, duration: 1.6, ease: 'expo.inOut', clearProps: 'clipPath,scale', scrollTrigger: { trigger: img, start: 'top 85%' } })
  })
  // Gentle parallax drift on the photographs themselves (whole figure moves, nothing is cropped).
  gsap.utils.toArray<HTMLElement>(`${scope} .pg-body .ph`).forEach((ph) => {
    gsap.fromTo(ph, { y: 40 }, { y: -40, ease: 'none', scrollTrigger: { trigger: ph, start: 'top bottom', end: 'bottom top', scrub: true } })
  })
}

export default function Campaign() {
  const root = useRef<HTMLDivElement>(null)
  const [here, setHere] = useState<'story' | 'scent'>('story')
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

  const book = () => scrollTo('book')
  const tab = (id: string) => (e: MouseEvent) => { e.preventDefault(); scrollTo(id) }

  // Setup: intro, cursor, magnetic buttons, book band.
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
          .from('.hero-ph img', { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15, duration: 1.5, ease: 'expo.inOut', clearProps: 'clipPath,scale' }, '-=0.5')
          .from('.ptitle .w', { yPercent: 110, stagger: 0.07, duration: 1.1 }, '<0.4')
          .from('.hero .pi', { y: 24, opacity: 0, stagger: 0.08, duration: 0.9, clearProps: 'transform' }, '<0.2')
          .from('.nav', { opacity: 0, y: -16, duration: 0.9, clearProps: 'all' }, '<')
        gsap.utils.toArray<HTMLElement>('.scramble').forEach((s) => {
          // Keep the text on the element: a re-run (StrictMode) would otherwise read the already-blanked node.
          const text = (s.dataset.text ??= s.textContent ?? '')
          s.textContent = ''
          gsap.to(s, { delay: 2.4, duration: 1.2, scrambleText: { text, chars: 'OUDTOPIA', speed: 0.5 } })
        })
        reveal('.page')
        reveal('.book')
        reveal('.foot')
      })

      // The tab for whichever half is on screen reads as current.
      ScrollTrigger.create({ trigger: '.scent', start: 'top 60%', onToggle: (self) => setHere(self.isActive ? 'scent' : 'story') })

      mm.add(`${MOTION} and (pointer: fine)`, () => {
        const cursor = document.querySelector<HTMLElement>('.cursor')!
        const cx = gsap.quickTo(cursor, 'x', { duration: 0.3, ease: 'power3' })
        const cy = gsap.quickTo(cursor, 'y', { duration: 0.3, ease: 'power3' })
        const move = (e: PointerEvent) => {
          cursor.style.opacity = '1'
          cx(e.clientX)
          cy(e.clientY)
          cursor.classList.toggle('is-link', !!(e.target as Element).closest('a, button'))
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
        <nav className="tabs" aria-label="Sections">
          <a className="tab" href="#story" aria-current={here === 'story' ? 'true' : undefined} onClick={tab('story')}>His &amp; Hers Story<sup>01</sup></a>
          <a className="tab" href="#scent" aria-current={here === 'scent' ? 'true' : undefined} onClick={tab('scent')}>The Scent<sup>02</sup></a>
        </nav>
        <button className="btn" data-magnetic onClick={book}>Book now</button>
      </header>

      <main>
        <Story onBook={book} />
        <Scent />

        <section className="book" id="book">
          <Drop className="book-drop rv" />
          <p className="eyebrow rv">Book now</p>
          <h2 className="book-title split">Call or text <em>to book the pair.</em></h2>
          <div className="book-phones rv"><Phones copy={copy} copied={copied} /></div>
          <div className="ctas rv">
            <a className="link-gold" href={TIKTOK} target="_blank" rel="noreferrer">Message us on TikTok</a>
          </div>
        </section>
      </main>

      <footer className="foot">
        <dl className="credits">
          {CREDITS.map((c) => (
            <div className="rv" key={c.role}><dt>{c.role}</dt><dd>{c.name}</dd></div>
          ))}
        </dl>
        <div className="foot-row">
          <a href={SITE} target="_blank" rel="noreferrer">www.oudtopia.co.uk</a>
          <a href={TIKTOK} target="_blank" rel="noreferrer">TikTok @oudtopia</a>
          <span>© 2026 OudTopia</span>
        </div>
      </footer>

      <p className={`toast ${copied ? 'is-on' : ''}`} role="status">{copied ? `Copied ${copied}` : ''}</p>
    </div>
  )
}
