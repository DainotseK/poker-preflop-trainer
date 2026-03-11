export default function ChartHeader({ title, description, note }) {
  return (
    <div className="chart-header">
      <h2>{title}</h2>
      <p className="chart-description">{description}</p>
      <div className="chart-note">{note}</div>
    </div>
  )
}
