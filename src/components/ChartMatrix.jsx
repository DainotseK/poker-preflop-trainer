const ACTION_LABELS = {
  raise: 'Raise',
  raise_bluff: 'Raise Bluff',
  call: 'Call / Limp',
  fold: 'Fold',
}

export default function ChartMatrix({ matrixData, onHoverHand }) {
  return (
    <div className="matrix-wrap">
      <table className="chart-table">
        <thead>
          <tr>
            <th className="axis-cell corner-cell" />
            {matrixData.ranks.map((rank) => (
              <th key={`col-${rank}`} className="axis-cell">
                {rank}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrixData.rows.map((row) => (
            <tr key={`row-${row.rank}`}>
              <th className="axis-cell">{row.rank}</th>
              {row.cells.map((cell) => (
                <td
                  key={cell.hand}
                  className={`hand-cell action-${cell.action}`}
                  onMouseEnter={() =>
                    onHoverHand({
                      hand: cell.hand,
                      actionLabel: ACTION_LABELS[cell.action],
                      handType: cell.handType,
                      context: cell.context,
                    })
                  }
                >
                  <div className="hand-label">{cell.hand}</div>
                  <div className="hand-type">{cell.handType}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
