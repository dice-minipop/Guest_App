export interface AnnouncementItem {
  id: number;
  title: string;
  city: string;
  district: string;
  hostName: string;
  target: string;
  recruitmentStartAt: string;
  recruitmentEndAt: string;
  likeCount: number;
  status: string;
}

export interface AnnouncementDetailItem {
  imageList: string[];
  title: string;
  isLiked: boolean;
  likeCount: number;
  location: string;
  locationDetail: string;
  target: string[];
  startDate: string;
  endDate: string;
  information: string;
}

export interface AnnouncementFilterDTO {
  city: string;
  district: string | null;
  targets: string[];
  status: string;
}
