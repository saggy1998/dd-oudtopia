import BottleScene from './components/BottleScene'
import MoodBoardContent from './components/MoodBoardContent'

function App() {
  return (
    <div className="page">
      <div className="left" id="leftPanel">
        {/* Logo top of the image */}
        <div className="logo-wrap">
          <img src="/oudtopia logo.jpeg" alt="OudTopia" />
        </div>

        <BottleScene />
        <div className="left-edge-line"></div>
        
        {/* Bottom label */}
        <div className="left-label">
          <span className="lbl-eyebrow">Luxury Wedding Stationery</span>
          <span className="lbl-name">OudTopia</span>
          <span className="lbl-sub">Bespoke Wedding Cards · 2026</span>
        </div>
      </div>
      <MoodBoardContent />
    </div>
  )
}

export default App
