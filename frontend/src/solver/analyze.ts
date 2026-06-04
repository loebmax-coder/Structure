export interface AnalysisResult {
  displacements: number[];
  memberForces: Record<number, number>;
  maxDisplacement: number;
}

export function analyzeStructure(): AnalysisResult {
  // Build 1 placeholder. Will be connected to
  // assemble -> supports -> solve -> member forces.
  return {
    displacements: [],
    memberForces: {},
    maxDisplacement: 0,
  };
}
