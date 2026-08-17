export default function MoodBoardContent() {
  return (
    <div className="right">
      <div className="right-bg-circle rbc1"></div>
      <div className="right-bg-circle rbc2"></div>

      <div className="content">
        <h1 className="main-title">
          Where <em>Oud</em><br />
          Becomes Utopia
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

        {/* Colour palette */}
        <div className="swatch-row">
          <div className="sw sw1" data-name="Midnight"></div>
          <div className="sw sw2" data-name="Gold"></div>
          <div className="sw sw3" data-name="Champagne"></div>
          <div className="sw sw4" data-name="Amber"></div>
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
