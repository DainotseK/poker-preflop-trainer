export default function HoverInfo({ hoveredHand }) {
  return (
    <div className="hover-panel">
      {!hoveredHand ? (
        <>
          <div className="hover-title">Valitud käsi</div>
          <div className="hover-main">Liiguta hiir ruudu peale</div>
          <div className="hover-sub">Siin kuvatakse käe nimi, action, käe tüüp ja valitud chart.</div>
        </>
      ) : (
        <>
          <div className="hover-title">Valitud käsi</div>
          <div className="hover-main">{hoveredHand.hand}</div>
          <div className="hover-sub">
            {hoveredHand.actionLabel} • {hoveredHand.handType} • {hoveredHand.context}
          </div>
        </>
      )}
    </div>
  )
}
