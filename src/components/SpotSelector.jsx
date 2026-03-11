export default function SpotSelector({ spots, selectedSpot, onSelect }) {
  return (
    <div className="control-group">
      <div className="control-title">Spot</div>
      <div className="button-row">
        {spots.map((spot) => (
          <button
            key={spot.key}
            type="button"
            className={`selector-button ${selectedSpot === spot.key ? 'active' : ''}`}
            onClick={() => onSelect(spot.key)}
          >
            {spot.label}
          </button>
        ))}
      </div>
    </div>
  )
}
