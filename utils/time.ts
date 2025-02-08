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
