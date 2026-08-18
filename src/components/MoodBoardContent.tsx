export default function MoodBoardContent() {
  return (
    <div className="right">
      <div className="right-bg-circle rbc1"></div>
      <div className="right-bg-circle rbc2"></div>

      <div className="content">
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

        {/* Colour palette */}
        <div className="swatch-row">
          <div className="sw sw1" data-name="Midnight"></div>
          <div className="sw sw2" data-name="Gold"></div>
          <div className="sw sw3" data-name="Champagne"></div>
          <div className="sw sw4" data-name="Blush"></div>
          <div className="sw sw5" data-name="Ivory"></div>
        </div>

        {/* Bottom: type specimen + year */}
        <div className="bottom-row" style={{ marginTop: '1.8rem' }}>
          <div className="type-specimen">
            <span className="ts-serif">Cormorant Garamond</span>
            <span className="ts-sans">Montserrat · Body & UI</span>
          </div>
          <div className="year-badge">2026</div>
        </div>
      </div>
    </div>
  )
}
