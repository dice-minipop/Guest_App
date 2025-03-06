import { PagenationDTO } from '@/types/page';

export interface SpaceItem {
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
  isLiked: boolean;
  isActivated: boolean;
}

export type GetSpaceListsResponse = PagenationDTO<SpaceItem>;
