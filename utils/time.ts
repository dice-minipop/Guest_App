export const translateTime = (time: string) => {
  const date = new Date(time);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

/**
 * 채팅 메시지의 createdAt을 포맷팅합니다.
 * - 오늘: "오전 12:34" 또는 "오후 12:34"
 * - 어제: "어제 오전 12:34"
 * - 그 이전: "12월 4일 오전 12:34"
 */
export const formatChatTime = (createdAt: string): string => {
  const date = new Date(createdAt);

  if (isNaN(date.getTime())) {
    return createdAt; // 파싱 실패 시 원본 반환
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours < 12 ? '오전' : '오후';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const timeString = `${period} ${displayHours}:${minutes}`;

  // 오늘인 경우
  if (messageDate.getTime() === today.getTime()) {
    return timeString;
  }

  // 어제인 경우
  if (messageDate.getTime() === yesterday.getTime()) {
    return `어제 ${timeString}`;
  }

  // 그 이전인 경우
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일 ${timeString}`;
};

/**
 * 채팅방 목록의 lastMessageAt을 포맷팅합니다.
 * - 오늘: "오전 12:34" 또는 "오후 12:34"
 * - 어제: "어제"
 * - 그 이전: "12월 4일"
 */
export const formatChatRoomDate = (lastMessageAt: string | null): string => {
  if (!lastMessageAt) {
    return '';
  }

  const date = new Date(lastMessageAt);

  if (isNaN(date.getTime())) {
    return lastMessageAt; // 파싱 실패 시 원본 반환
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // 오늘인 경우
  if (messageDate.getTime() === today.getTime()) {
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours < 12 ? '오전' : '오후';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${period} ${displayHours}:${minutes}`;
  }

  // 어제인 경우
  if (messageDate.getTime() === yesterday.getTime()) {
    return '어제';
  }

  // 그 이전인 경우
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};
