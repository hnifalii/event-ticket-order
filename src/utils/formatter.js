export function parseDMY(dateStr, locale) {
  const [day, month, year] = dateStr.split("-");
  const date = new Date(year, month - 1, day);

  const readableDate = new Intl.DateTimeFormat(locale ?? "en-US", {dateStyle: "full"}).format(date)

  return {
    fullDate: date,
    readableDate,
    day: date.getDay(),
    date: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}