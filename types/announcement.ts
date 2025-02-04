export interface AnnouncementItem {
  id: number;
  city: string;
  source: string;
  title: string;
  isLiked: boolean;
  likeCount: number;
  target: string;
  startDate: string;
  endDate: string;
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
