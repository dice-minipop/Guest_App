export function getDDay(endDate: string | Date): string {
  const today = new Date();
  const end = new Date(endDate);

  // 하루 단위로 비교를 위해 시간을 0시로 설정
  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `D-${diffDays}`;
  if (diffDays === 0) return 'D-Day';
  return `D+${Math.abs(diffDays)}`;
}
