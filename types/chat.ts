export interface ChatRoomItem {
  id: number;
  spaceName: string;
  spaceImage: string;
  lastMessage: string;
  lastMessageAt: string | null;
  unreadCount: number;
}

export interface ChatRoomDetailItem {
  id: number;
  content: string;
  type: string;
  senderName: string;
  senderId: number;
  createdAt: string;
  isLoginUsersMessage: boolean;
}
