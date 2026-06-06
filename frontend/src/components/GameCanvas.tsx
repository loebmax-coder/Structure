{results && (
  <>
    <hr />

    <h3>Analysis</h3>

    <p>Height: {results.heightFt} ft</p>

    <p>
      Cost: ${results.costMillion.toFixed(2)}M
    </p>

    <p>
      Schedule: {results.durationMonths} months
    </p>

    <p>
      Wind: {results.windMph} mph
    </p>

    <p>
      Gravity Load: {results.gravityLoadKips.toFixed(0)} k
    </p>

    <p>
      Max Force: {results.maxMemberForce.toFixed(0)} k
    </p>

    <p>
      Utilization: {(results.utilization * 100).toFixed(0)}%
    </p>

    <p>
      Drift: {results.driftRatio}
    </p>

    <h2>
      Efficiency Score: {results.score}
    </h2>
  </>
)}
