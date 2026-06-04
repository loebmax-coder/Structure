export type OccupancyType = 'office' | 'residential' | 'hotel' | 'school' | 'parking' | 'storage';

export interface Floor {
  id: number;
  elevation: number;
  width: number;
  depth: number;
  occupancy: OccupancyType;
  deadLoadPsf: number;
  liveLoadPsf: number;
}
