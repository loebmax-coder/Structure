export type SupportType = 'fixed' | 'pin' | 'roller';
export type MemberSize = 'small' | 'medium' | 'large';

export interface Node {
  id: number;
  x: number;
  y: number;
}

export interface Member {
  id: number;
  startNodeId: number;
  endNodeId: number;
  size: MemberSize;
}

export interface Support {
  id: number;
  nodeId: number;
  type: SupportType;
}

export interface AnalysisResult {
  displacements: number[];
  memberForces: Record<number, number>;
  maxDisplacement: number;
}
