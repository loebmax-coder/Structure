export interface AnalysisResult {
  heightFt: number;
  costMillion: number;
  durationMonths: number;
  windMph: number;
  gravityLoadKips: number;
  maxMemberForce: number;
  utilization: number;
  score: number;
  driftRatio: string;
  pass: boolean;
}

export function analyzeStructure(
  memberCount = 6,
  heightFt = 600
): AnalysisResult {

  const windMph = 115;

  const gravityLoadKips = heightFt * 2.5;

  const maxMemberForce =
    gravityLoadKips / Math.max(memberCount * 0.75, 1);

  const utilization =
    Math.min(0.98, maxMemberForce / 400);

  const costMillion =
    Number(
      (
        memberCount * 0.18 +
        heightFt * 0.002
      ).toFixed(2)
    );

  const durationMonths =
    Math.round(
      10 +
      heightFt / 80 +
      memberCount / 2
    );

  const score =
    Math.round(
      (heightFt * 100) /
      (costMillion * 10)
    );

  const pass =
    utilization < 0.90;

  return {
    heightFt,
    costMillion,
    durationMonths,
    windMph,
    gravityLoadKips,
    maxMemberForce,
    utilization,
    score,
    driftRatio: pass ? "H/500" : "H/250",
    pass
  };
}
