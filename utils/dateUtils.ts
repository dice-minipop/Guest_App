// 두 날짜 사이가 며칠인지 계산하는 메서드
export function calculateDurationInDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 하루는 86400000ms, +1을 해서 시작일과 종료일 모두 포함
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return diffDays;
}

// ISO 날짜 문자열 => 25. 3. 1
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${year}.${month}.${day}`;
};

// 2025-03-01 => 25. 3. 1
export function formatToCompactDate(dateStr: string): string {
  const date = new Date(dateStr);

  const year = String(date.getFullYear()).slice(2); // '25'
  const month = date.getMonth() + 1; // 1부터 시작
  const day = date.getDate();

  return `${year}. ${month}. ${day}`;
}
