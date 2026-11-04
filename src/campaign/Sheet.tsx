import { useLayoutEffect, useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { X } from 'lucide-react'
import { PERFUMES } from './data'
import { MOTION } from './panels'

type Perfume = (typeof PERFUMES)[number]

/* The perfume pop-up: a full-bleed page that opens out of the photo that was tapped. */
export default function Sheet({ perfume, onClosed, onBuy }: {
  perfume: Perfume | null
  onClosed: () => void
  onBuy: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    if (!perfume) return
    const d = dialog.current!
    if (!d.open) d.showModal()
    const ctx = gsap.context(() => {
      tl.current = null
      if (!matchMedia(MOTION).matches) return
      // It opens from the side the photo sits on: left/right on desktop, top/bottom on phones.
      const second = PERFUMES.indexOf(perfume) === 1
      const from = matchMedia('(max-width: 899px)').matches
        ? (second ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)')
        : (second ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)')
      const name = SplitText.create('.sheet-name', { type: 'words', mask: 'words', wordsClass: 'w' })
      tl.current = gsap.timeline({ defaults: { ease: 'expo.out' } })
        .fromTo('.sheet-panel', { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'expo.inOut' })
        .from('.sheet-photo img', { scale: 1.3, duration: 1.6 }, 0.2)
        .from('.sheet-inset', { yPercent: 25, opacity: 0, duration: 1.2 }, 0.6)
        .from(name.words, { yPercent: 110, stagger: 0.06, duration: 1 }, 0.55)
        .from('.rv', { y: 20, opacity: 0, stagger: 0.05, duration: 0.9 }, 0.7)
    }, d)
    return () => ctx.revert()
  }, [perfume])

  const close = () => {
    const done = () => { dialog.current!.close(); onClosed() }
    const t = tl.current
    if (!t) return done()
    t.eventCallback('onReverseComplete', done)
    t.timeScale(1.8).reverse()
  }

  const p = perfume
  return (
    <dialog
      className={`sheet ${p && PERFUMES.indexOf(p) === 1 ? 'is-right' : ''}`}
      ref={dialog}
      aria-labelledby="sheet-name"
      onCancel={(e) => { e.preventDefault(); close() }} // Esc plays the closing animation too
    >
      {p && (
        <div className="sheet-panel" style={{ '--liquid': p.liquid } as CSSProperties}>
          <button className="sheet-close" onClick={close} autoFocus>Close <X size={14} /></button>
          <figure className="sheet-photo">
            <img src={p.shots[0].src} alt={p.shots[0].alt} width={p.shots[0].w} height={p.shots[0].h} />
            <img className="sheet-inset" src={p.shots[1].src} alt={p.shots[1].alt} width={p.shots[1].w} height={p.shots[1].h} loading="lazy" />
          </figure>
          <div className="sheet-text">
            <p className="sheet-num rv">No. 0{PERFUMES.indexOf(p) + 1}</p>
            <p className="who rv">{p.who} · worn by {p.model}</p>
            <h2 className="sheet-name" id="sheet-name">{p.name}</h2>
            <p className="sheet-line rv">{p.line}</p>
            <p className="sheet-about rv">{p.about}</p>
            <p className="sheet-story rv">{p.story}</p>
            <dl className="notes rv">
              {p.notes.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
            <p className="bottle-spec rv">{p.spec}</p>
            <p className="sheet-links rv">
              <button className="btn" onClick={onBuy}>Buy now</button>
            </p>
          </div>
        </div>
      )}
    </dialog>
  )
}
