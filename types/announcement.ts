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
  isLiked: boolean;
  status: string;
}

export interface AnnouncementDetailItem {
  id: number;
  title: string;
  city: string;
  district: string;
  address: string;
  hostName: string;
  target: string;
  imageUrls: string[];
  recruitmentStartAt: string;
  recruitmentEndAt: string;
  details: string;
  contactNumber: string;
  websiteUrl: string;
  likeCount: number;
  status: string;
  isLiked: boolean;
}

export interface AnnouncementFilterDTO {
  city: string;
  district: string | null;
  targets: string[];
  status: string;
}

export interface AnnouncementDetailComponentProps {
  data: AnnouncementDetailItem;
}
