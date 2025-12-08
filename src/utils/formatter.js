export function parseDMY(dateStr) {
  const [day, month, year] = dateStr.split("-");
  const date = new Date(year, month - 1, day);

  return {
    date,
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}