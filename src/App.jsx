import { useMemo, useState } from 'react'
import chartData from './data/8max.json'
import { buildMatrixData } from './lib/chartUtils'
import FormatSelector from './components/FormatSelector'
import PositionSelector from './components/PositionSelector'
import SpotSelector from './components/SpotSelector'
import ActionLegend from './components/ActionLegend'
import ChartHeader from './components/ChartHeader'
import ChartMatrix from './components/ChartMatrix'
import HoverInfo from './components/HoverInfo'

export default function App() {
  const [selectedFormat] = useState('8max')
  const [selectedPosition, setSelectedPosition] = useState('UTG')
  const [selectedSpot, setSelectedSpot] = useState('open')
  const [hoveredHand, setHoveredHand] = useState(null)

  const positions = chartData.positions
  const positionKeys = Object.keys(positions)
  const positionData = positions[selectedPosition]
  const spotKeys = Object.keys(positionData.spots)
  const spotData = positionData.spots[selectedSpot]

  const matrixData = useMemo(() => {
    return buildMatrixData({
      formatLabel: chartData.label,
      positionLabel: positionData.label,
      spotLabel: spotData.label,
      actions: spotData.actions,
    })
  }, [positionData, spotData])

  return (
    <div className="app-shell">
      <div className="page-card hero-card">
        <h1>8-max Holdem Preflop Trainer</h1>
        <p>
          See on esimene korrektne baasversioon. Praegu toetab ainult 8-max Holdem
          open raise chart’e. Hiljem lisame 6-max, 3-max, HU, SB mixed ja BB defend.
        </p>
      </div>

      <div className="page-card controls-card">
        <FormatSelector selectedFormat={selectedFormat} formats={[chartData.label]} />

        <PositionSelector
          positions={positionKeys.map((key) => ({ key, label: positions[key].label }))}
          selectedPosition={selectedPosition}
          onSelect={(value) => {
            setSelectedPosition(value)
            setSelectedSpot(Object.keys(positions[value].spots)[0])
            setHoveredHand(null)
          }}
        />

        <SpotSelector
          spots={spotKeys.map((key) => ({ key, label: positionData.spots[key].label }))}
          selectedSpot={selectedSpot}
          onSelect={(value) => {
            setSelectedSpot(value)
            setHoveredHand(null)
          }}
        />
      </div>

      <div className="page-card chart-card">
        <ChartHeader
          title={`${chartData.label} • ${positionData.label} • ${spotData.label}`}
          description={spotData.description}
          note={spotData.note}
        />

        <ActionLegend actions={spotData.actions} />

        <ChartMatrix matrixData={matrixData} onHoverHand={setHoveredHand} />

        <HoverInfo hoveredHand={hoveredHand} />
      </div>
    </div>
  )
}
