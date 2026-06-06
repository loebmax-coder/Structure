export interface AnalysisResult {
  cost: number;
  durationMonths: number;
  windMph: number;
  score: number;
  driftRatio: string;
  pass: boolean;
}

export function analyzeStructure(memberCount = 6, heightFt = 600): AnalysisResult {
  const windMph = 115;

  const cost = memberCount * 0.75; // $M
  const durationMonths = 12 + memberCount;

  const score = Number(
    ((heightFt * heightFt) / (cost * 100000)).toFixed(2)
  );

  return {
    cost,
    durationMonths,
    windMph,
    score,
    driftRatio: "H/480",
    pass: true
  };
}
