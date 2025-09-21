export type SpaceFilter = {
  city?: string;
  district?: string;
  targetGender?: string[];
  targetAgeGroup?: number[];
  targetDayofWeek?: string[];
  targetPurpose?: string[];
  minPrice?: number;
  maxPrice?: number;
  minSize?: number;
  maxSize?: number;
  sortBy?: string;
};

export type AnnouncementFilter = {
  city?: string;
  district?: string;
  targets?: string[];
  status?: string;
  sortBy?: string;
};
