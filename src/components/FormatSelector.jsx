export default function FormatSelector({ formats }) {
  return (
    <div className="control-group">
      <div className="control-title">Format</div>
      <div className="button-row">
        {formats.map((format) => (
          <button key={format} className="selector-button active" type="button">
            {format}
          </button>
        ))}
      </div>
      <div className="helper-text">Praegu lukustatud ainult 8-max peale.</div>
    </div>
  )
}
