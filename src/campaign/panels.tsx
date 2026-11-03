import type { ReactNode } from 'react'
import { Check, Copy, Phone } from 'lucide-react'
import { PHONES, type Shot } from './data'
import { spray } from './GoldDust'

export const MOTION = '(prefers-reduced-motion: no-preference)'

export function Drop({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <circle className="drop-ring" cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="2" />
      <path className="drop-fill" d="M24 10c-5 7-8 11.5-8 16a8 8 0 0 0 16 0c0-4.5-3-9-8-16z" fill="currentColor" />
    </svg>
  )
}

export const sprayFrom = (el: Element, color: string) => {
  const r = el.getBoundingClientRect()
  spray(r.left + r.width / 2, r.top + r.height / 2, color, 60)
}

/* A borderless photograph; an optional caption is set over the image. */
export function Photo({ shot, className = '', eager, children }: { shot: Shot; className?: string; eager?: boolean; children?: ReactNode }) {
  return (
    <figure className={`ph ${className}`}>
      <img src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} />
      {children && <figcaption className="ph-cap">{children}</figcaption>}
    </figure>
  )
}

/* ---------------- Phones (book band + dialog) ---------------- */
export function Phones({ copy, copied }: { copy: (text: string) => void; copied: string | null }) {
  return PHONES.map((ph) => (
    <div className="phone" key={ph.href}>
      <a href={ph.href}><Phone size={14} /> {ph.label}</a>
      <button onClick={() => copy(ph.label)} aria-label={`Copy ${ph.label}`}>
        {copied === ph.label ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  ))
}
