const monthMap: Record<string, number> = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

export function parsePackDateString(dateStr: string): [number, number, number] | null {
  const parts = dateStr.trim().split(" ");
  if (parts.length !== 3) {
    return null;
  }

  const [dayStr, monthStr, yearStr] = parts;
  const day = parseInt(dayStr, 10);
  const month = monthMap[monthStr];
  const year = parseInt(yearStr, 10);

  if (isNaN(day) || day < 1 || day > 31 || month === undefined || isNaN(year)) {
    return null;
  }

  const fullYear = 2000 + year;

  return [fullYear, month, day];
}