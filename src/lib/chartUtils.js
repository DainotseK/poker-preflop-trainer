import { RANKS, buildActionSet } from './rangeParser'

function getHandLabel(rowIndex, colIndex) {
  const first = RANKS[rowIndex]
  const second = RANKS[colIndex]

  if (rowIndex === colIndex) return `${first}${second}`
  if (colIndex > rowIndex) return `${first}${second}s`
  return `${second}${first}o`
}

function getHandType(rowIndex, colIndex) {
  if (rowIndex === colIndex) return 'pair'
  if (colIndex > rowIndex) return 'suited'
  return 'offsuit'
}

export function buildMatrixData({ formatLabel, positionLabel, spotLabel, actions }) {
  const raiseSet = buildActionSet(actions.raise || [])
  const raiseBluffSet = buildActionSet(actions.raise_bluff || [])
  const callSet = buildActionSet(actions.call || [])

  const rows = RANKS.map((rank, rowIndex) => {
    const cells = RANKS.map((_, colIndex) => {
      const hand = getHandLabel(rowIndex, colIndex)
      const handType = getHandType(rowIndex, colIndex)

      let action = 'fold'
      if (raiseSet.has(hand)) action = 'raise'
      else if (raiseBluffSet.has(hand)) action = 'raise_bluff'
      else if (callSet.has(hand)) action = 'call'

      return {
        hand,
        handType,
        action,
        context: `${formatLabel} • ${positionLabel} • ${spotLabel}`,
      }
    })

    return { rank, cells }
  })

  return {
    ranks: RANKS,
    rows,
  }
}
