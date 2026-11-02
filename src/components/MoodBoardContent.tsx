import type { Mode } from '../types'

interface MoodBoardContentProps {
  activeMode: Mode
  isMenuOpen: boolean
  isFlipping: boolean
  onToggleMenu: () => void
  onSelectMode: (mode: Mode) => void
}

export default function MoodBoardContent({
  activeMode,
  isMenuOpen,
  isFlipping,
  onToggleMenu,
  onSelectMode,
}: MoodBoardContentProps) {
  return (
    <div className="right">
      <div className="right-bg-circle rbc1"></div>
      <div className="right-bg-circle rbc2"></div>

      {/* 3D Card Flipper Wrapper (Option 3) */}
      <div className={`content-flipper ${isFlipping ? 'flipping-3d' : ''}`}>
        <div className="content">
          {activeMode === 'wedding' ? (
            <>
              <h1 className="main-title">
                <span className="line1">Where <em data-text="Love">Love</em></span>
                <span className="line2">Becomes Legacy</span>
              </h1>
              <p className="tagline">"Every union deserves a timeless beginning."</p>

              <div className="gold-divider"></div>

              <p className="descriptor">
                Bespoke luxury wedding stationery crafted for those who believe
                the first impression of forever should be extraordinary — 
                layered in gold, sealed with intention.
              </p>

              {/* Attribute pills */}
              <div className="pills">
                <span className="pill">Bespoke</span>
                <span className="pill">Heirloom</span>
                <span className="pill">Luxury</span>
                <span className="pill">Timeless</span>
                <span className="pill">Gold · Ivory · Black</span>
              </div>
            </>
          ) : (
            <>
              <h1 className="main-title">
                <span className="line1">Where <em data-text="Oud">Oud</em></span>
                <span className="line2">Becomes Utopia</span>
              </h1>
              <p className="tagline">"Luxury distilled into every drop."</p>

              <div className="gold-divider"></div>

              <p className="descriptor">
                A luxury perfume house rooted in the ancient tradition of oud — 
                translated into modern elegance for those who seek depth, 
                warmth, and rare distinction.
              </p>

              {/* Attribute pills */}
              <div className="pills">
                <span className="pill">Heritage</span>
                <span className="pill">Authenticity</span>
                <span className="pill">Luxury</span>
                <span className="pill">Exclusivity</span>
                <span className="pill">Oud · Amber · Musk</span>
              </div>
            </>
          )}

          {/* Replaced Color Palette & Swatches with Primary CTA Button */}
          <div className="cta-action-row">
            <button 
              className={`checkout-options-btn ${isMenuOpen ? 'active' : ''}`}
              onClick={onToggleMenu}
            >
              <span>Checkout Other Options</span>
              <svg 
                className={`btn-arrow ${isMenuOpen ? 'open' : ''}`} 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
          </div>

          {/* Bottom: type specimen + year */}
          <div className="bottom-row">
            <div className="type-specimen">
              <span className="ts-serif">Cormorant Garamond</span>
              <span className="ts-sans">Montserrat · Body & UI</span>
            </div>
            <div className="year-badge">2026</div>
          </div>
        </div>
      </div>

      {/* Category Selection Glass Modal / Drawer (Option 1) */}
      {isMenuOpen && (
        <div className="glass-options-backdrop" onClick={onToggleMenu}>
          <div className="glass-options-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-eyebrow">Select Collection</span>
              <button className="modal-close" onClick={onToggleMenu}>✕</button>
            </div>

            <div className="option-cards-grid">
              <div 
                className={`option-card ${activeMode === 'wedding' ? 'selected' : ''}`}
                onClick={() => onSelectMode('wedding')}
              >
                <div className="card-badge">01</div>
                <div className="card-icon">💍</div>
                <div className="card-title">Bespoke Wedding Cards</div>
                <div className="card-desc">Luxury stationery layered in gold & crafted for timeless union.</div>
                {activeMode === 'wedding' && <span className="card-active-indicator">Active</span>}
              </div>

              <div 
                className={`option-card ${activeMode === 'perfume' ? 'selected' : ''}`}
                onClick={() => onSelectMode('perfume')}
              >
                <div className="card-badge">02</div>
                <div className="card-icon">✦</div>
                <div className="card-title">Signature Perfume Collection</div>
                <div className="card-desc">Ancient oud translated into modern luxury & distinction.</div>
                {activeMode === 'perfume' && <span className="card-active-indicator">Active</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
