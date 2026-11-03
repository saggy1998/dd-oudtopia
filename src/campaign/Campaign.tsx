import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { SplitText } from 'gsap/SplitText'
import { SITE } from './data'
import GoldDust from './GoldDust'
import { Drop, MOTION } from './panels'
import { Scent, Story } from './pages'
import './campaign.css'

gsap.registerPlugin(ScrambleTextPlugin, SplitText)

export default function Campaign() {
  const root = useRef<HTMLDivElement>(null)
  const [pane, setPane] = useState(0) // phones only: which of the two screens is showing
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

  // Book now reveals the numbers in place: on a phone it glides to the second screen, then they glow gold.
  const book = () => {
    document.getElementById('contact')!.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
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
          .from('.hero-ph img', { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15, duration: 1.5, ease: 'expo.inOut', clearProps: 'clipPath,scale' }, '-=0.5')
          .from('.ptitle .w', { yPercent: 110, stagger: 0.07, duration: 1.1 }, '<0.4')
          .from('.pi', { y: 24, opacity: 0, stagger: 0.08, duration: 0.9, clearProps: 'transform,opacity' }, '<0.2')
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
        <p className="pager" aria-hidden="true">
          <span className={pane === 0 ? 'on' : ''}>01</span> / <span className={pane === 1 ? 'on' : ''}>02</span>
        </p>
        <button className="btn" data-magnetic onClick={book}>Book now</button>
      </header>

      {/* Desktop: one editorial page. Phones: two full screens side by side, swiped. */}
      <main className="spread" onScroll={(e) => setPane(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}>
        <Story />
        <Scent copy={copy} copied={copied} />
      </main>

      <p className={`toast ${copied ? 'is-on' : ''}`} role="status">{copied ? `Copied ${copied}` : ''}</p>
    </div>
  )
}
