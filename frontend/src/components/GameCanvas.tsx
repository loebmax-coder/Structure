{results && (
  <>
    <hr />

    <h3>Analysis</h3>

    <p>Wind: {results.windMph} mph</p>
    <p>Cost: ${results.cost.toFixed(2)}M</p>
    <p>Schedule: {results.durationMonths} mo</p>
    <p>Drift: {results.driftRatio}</p>

    <h2>
      Score: {results.score}
    </h2>
  </>
)}
