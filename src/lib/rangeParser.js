export const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

function expandPairPlus(token) {
  const start = rankIndex[token[0]]
  const hands = []
  for (let i = start; i >= 0; i -= 1) {
    hands.push(`${RANKS[i]}${RANKS[i]}`)
  }
  return hands
}

function expandPairRange(token) {
  const [left, right] = token.split('-')
  const start = rankIndex[left[0]]
  const end = rankIndex[right[0]]
  const hands = []
  for (let i = start; i <= end; i += 1) {
    hands.push(`${RANKS[i]}${RANKS[i]}`)
  }
  return hands
}

function expandSuitedOrOffsuitPlus(token) {
  const high = token[0]
  const low = token[1]
  const suffix = token[2]
  const highIndex = rankIndex[high]
  const lowIndex = rankIndex[low]
  const hands = []

  for (let i = lowIndex; i > highIndex; i -= 1) {
    hands.push(`${high}${RANKS[i]}${suffix}`)
  }

  return hands
}

function expandLinearRange(token) {
  const [left, right] = token.split('-')
  const high = left[0]
  const leftLow = left[1]
  const rightLow = right[1]
  const suffix = left[2]

  const start = rankIndex[leftLow]
  const end = rankIndex[rightLow]
  const hands = []

  for (let i = start; i <= end; i += 1) {
    hands.push(`${high}${RANKS[i]}${suffix}`)
  }

  return hands
}

export function expandToken(token) {
  if (/^([AKQJT98765432])\1\+$/.test(token)) {
    return expandPairPlus(token)
  }

  if (/^([AKQJT98765432])\1-([AKQJT98765432])\2$/.test(token)) {
    return expandPairRange(token)
  }

  if (/^[AKQJT98765432][AKQJT98765432][so]\+$/.test(token)) {
    return expandSuitedOrOffsuitPlus(token.slice(0, 3))
  }

  if (/^[AKQJT98765432][AKQJT98765432][so]-[AKQJT98765432][AKQJT98765432][so]$/.test(token)) {
    return expandLinearRange(token)
  }

  return [token]
}

export function buildActionSet(tokens = []) {
  const hands = new Set()
  tokens.forEach((token) => {
    expandToken(token).forEach((hand) => hands.add(hand))
  })
  return hands
}
