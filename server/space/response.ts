import { PagenationDTO } from '@/types/page';
import { SpaceItem } from '@/types/space';

export type GetSpaceListsResponse = PagenationDTO<SpaceItem>;

export interface SpacePopulationAnalysisResponse {
  title: string;
  description: string;
  date: string;
  location: string;
  locationCount: number;
  areaCount: number;
  nationalCount: number;
  targets: string[];
  ageGroupsCountMan: number[];
  ageGroupsCountWoman: number[];
  dayOfWeekCount: number[];
}
