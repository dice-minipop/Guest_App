import { PagenationDTO } from '@/types/page';

export interface UpdateInfoResponse {
  name: string;
  email: string;
  phone: string;
  brandList: {
    id: number;
    name: string;
    logoUrl: string;
  }[];
}

export interface LikedSpace {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
  pricePerDay: number;
  discountRate: number;
  discountPrice: number;
  capacity: number;
  size: number;
  likeCount: number;
  chatRoomId: number | null;
  liked: boolean;
}

export type GetLikedSpaceListsResponse = PagenationDTO<LikedSpace>;

export interface LikedAnnouncement {
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

export type GetLikedAnnouncementListsResponse = PagenationDTO<LikedAnnouncement>;

export interface GetGuestInfoResponse {
  name: string;
  email: string;
  phone: string;
  brandList: {
    id: number;
    name: string;
    logoUrl: string;
  }[];
}
