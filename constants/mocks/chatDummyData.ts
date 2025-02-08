export type ChatItem = {
  id: number;
  content: string;
  isMe: boolean;
};

export const dummyData: ChatItem[] = [
  { id: 1, content: '안녕하세요~', isMe: true },
  { id: 2, content: '안녕하세요~', isMe: true },
  { id: 3, content: '안녕하세요~', isMe: false },
  { id: 4, content: '안녕하세요~', isMe: false },
];
