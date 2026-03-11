export default function PositionSelector({ positions, selectedPosition, onSelect }) {
  return (
    <div className="control-group">
      <div className="control-title">Position</div>
      <div className="button-row">
        {positions.map((position) => (
          <button
            key={position.key}
            type="button"
            className={`selector-button ${selectedPosition === position.key ? 'active' : ''}`}
            onClick={() => onSelect(position.key)}
          >
            {position.label}
          </button>
        ))}
      </div>
    </div>
  )
}
