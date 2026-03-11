const ACTION_LABELS = {
  raise: 'Raise',
  raise_bluff: 'Raise Bluff',
  call: 'Call / Limp',
  fold: 'Fold',
}

export default function ActionLegend({ actions }) {
  const visibleActions = ['raise', 'raise_bluff', 'call', 'fold'].filter((action) => {
    if (action === 'fold') return true
    return Array.isArray(actions[action]) && actions[action].length > 0
  })

  return (
    <div className="legend-row">
      {visibleActions.map((action) => (
        <div key={action} className="legend-item">
          <span className={`legend-swatch action-${action}`} />
          <span>{ACTION_LABELS[action]}</span>
        </div>
      ))}
    </div>
  )
}
