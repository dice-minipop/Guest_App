export interface ChatRoom {
  chatRoomId: number;
  name: string;
  createdAt: string;
  lastContent: string;
  notReadCount: number;
  storeImage: string;
  adminImage: string;
}

export const dummyData: ChatRoom[] = [
  {
    chatRoomId: 1,
    name: '팝업 공간 이름1',
    createdAt: '오후 06:33',
    lastContent: '마지막 대화내용',
    notReadCount: 0,
    storeImage: 'https://placehold.co/600x400/png',
    adminImage: 'https://placehold.co/600x400/png',
  },
  {
    chatRoomId: 3,
    name: '팝업 공간 이름2',
    createdAt: '오후 06:33',
    lastContent: '마지막 대화내용',
    notReadCount: 1,
    storeImage: 'https://placehold.co/600x400/png',
    adminImage: 'https://placehold.co/600x400/png',
  },
  {
    chatRoomId: 2,
    name: '팝업 공간 이름3',
    createdAt: '오후 06:33',
    lastContent: '마지막 대화내용',
    notReadCount: 1000,
    storeImage: 'https://placehold.co/600x400/png',
    adminImage: 'https://placehold.co/600x400/png',
  },
  {
    chatRoomId: 5,
    name: '팝업 공간 이름4',
    createdAt: '오후 06:33',
    lastContent: '마지막 대화내용',
    notReadCount: 0,
    storeImage: 'https://placehold.co/600x400/png',
    adminImage: 'https://placehold.co/600x400/png',
  },
  {
    chatRoomId: 7,
    name: '팝업 공간 이름5',
    createdAt: '오후 06:33',
    lastContent: '마지막 대화내용',
    notReadCount: 0,
    storeImage: 'https://placehold.co/600x400/png',
    adminImage: 'https://placehold.co/600x400/png',
  },
];
