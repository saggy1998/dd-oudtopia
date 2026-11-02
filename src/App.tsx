import { useState } from 'react'
import BottleScene from './components/BottleScene'
import MoodBoardContent from './components/MoodBoardContent'
import type { Mode } from './types'

function App() {
  const [activeMode, setActiveMode] = useState<Mode>('wedding')
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isFlipping, setIsFlipping] = useState<boolean>(false)

  const handleSelectMode = (newMode: Mode) => {
    if (newMode === activeMode) {
      setIsMenuOpen(false)
      return
    }

    setIsMenuOpen(false)
    setIsFlipping(true)

    // Halfway through 3D flip (300ms), swap active mode & video
    setTimeout(() => {
      setActiveMode(newMode)
    }, 300)

    // Complete 3D flip (600ms)
    setTimeout(() => {
      setIsFlipping(false)
    }, 600)
  }

  return (
    <div className="page">
      <div className="left" id="leftPanel">
        {/* Logo top of the image */}
        <div className="logo-wrap">
          <img src="/oudtopia logo.jpeg" alt="OudTopia" />
        </div>

        {/* Floating Product Thumbnail Card (Swaps to alternate product preview) */}
        <div 
          className="product-inset-card" 
          title={activeMode === 'wedding' ? "Signature Fragrance" : "Bespoke Wedding Cards"}
          onClick={() => handleSelectMode(activeMode === 'wedding' ? 'perfume' : 'wedding')}
        >
          <img 
            src={activeMode === 'wedding' ? "/1.jpeg" : "/oudtopia logo.jpeg"} 
            alt="Product Preview" 
            className="inset-img" 
          />
          <span className="inset-tag">
            {activeMode === 'wedding' ? "Fragrance" : "Stationery"}
          </span>
        </div>

        <BottleScene activeVideo={activeMode === 'wedding' ? "/wedding_card.mp4" : "/perfume_video.mp4"} />
        <div className="left-edge-line"></div>

        {/* Bottom label */}
        <div className="left-label">
          <span className="lbl-eyebrow">
            {activeMode === 'wedding' ? "Luxury Wedding Stationery" : "Signature Fragrance"}
          </span>
          <span className="lbl-name">OudTopia</span>
          <span className="lbl-sub">
            {activeMode === 'wedding' ? "Bespoke Wedding Cards · 2026" : "Eau de Parfum · 50ml"}
          </span>
        </div>
      </div>

      <MoodBoardContent
        activeMode={activeMode}
        isMenuOpen={isMenuOpen}
        isFlipping={isFlipping}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        onSelectMode={handleSelectMode}
      />
    </div>
  )
}

export default App
