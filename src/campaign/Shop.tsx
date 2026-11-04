import { useLayoutEffect, useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { X } from 'lucide-react'
import { DUO_SHOP, INSTAGRAM, PERFUMES, SITE, TIKTOK } from './data'
import { MOTION, Phones } from './panels'

/* Buy now: the shop and every contact detail live here and nowhere else on the page. */
export default function Shop({ open, onClosed, copy, copied }: {
  open: boolean
  onClosed: () => void
  copy: (text: string) => void
  copied: string | null
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    if (!open) return
    const d = dialog.current!
    if (!d.open) d.showModal()
    const ctx = gsap.context(() => {
      tl.current = null
      if (!matchMedia(MOTION).matches) return
      tl.current = gsap.timeline({ defaults: { ease: 'expo.out' } })
        .fromTo('.shop-panel', { xPercent: 100 }, { xPercent: 0, duration: 0.9, ease: 'expo.inOut' })
        .from('.shop .rv', { y: 18, opacity: 0, stagger: 0.05, duration: 0.8 }, 0.45)
    }, d)
    return () => ctx.revert()
  }, [open])

  const close = () => {
    const done = () => { dialog.current!.close(); onClosed() }
    const t = tl.current
    if (!t) return done()
    t.eventCallback('onReverseComplete', done)
    t.timeScale(1.8).reverse()
  }

  return (
    <dialog
      className="shop"
      ref={dialog}
      aria-labelledby="shop-title"
      onCancel={(e) => { e.preventDefault(); close() }}
      onClick={(e) => { if (e.target === e.currentTarget) close() }} // a click outside the panel closes it
    >
      {open && (
        <div className="shop-panel">
          <button className="sheet-close" onClick={close} autoFocus>Close <X size={14} /></button>
          <p className="eyebrow rv">Buy now</p>
          <h2 className="shop-title rv" id="shop-title">Buy it <em>together.</em></h2>
          <p className="shop-pair rv">
            {PERFUMES.map((p) => (
              <span className="who" key={p.id} style={{ '--liquid': p.liquid } as CSSProperties}>{p.who} · {p.name}</span>
            ))}
          </p>

          <div className="shop-ctas">
            <div className="rv">
              <a className="cta cta-main" href={DUO_SHOP || undefined} target="_blank" rel="noreferrer">
                Shop the duo — £99 <span className="cta-sep" aria-hidden="true" /> Free gift wrap
              </a>
              <p className="cta-sub">Ships from Dulhan Diaries, gift box included</p>
            </div>
            <div className="rv">
              <a className="cta cta-alt" href={SITE} target="_blank" rel="noreferrer">Order from OudTopia Official</a>
              <p className="cta-sub">Direct from brand</p>
            </div>
          </div>

          <div className="shop-contact rv">
            <p className="eyebrow">Call or text to order</p>
            <Phones copy={copy} copied={copied} />
          </div>
          <p className="shop-links rv">
            <a className="link-gold" href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram @oudtopia1</a>
            <a className="link-gold" href={TIKTOK} target="_blank" rel="noreferrer">TikTok @oudtopia</a>
          </p>
        </div>
      )}
    </dialog>
  )
}
