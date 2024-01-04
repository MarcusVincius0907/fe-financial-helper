export function getLastAndNext5Years(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];

  // Get the last 5 years
  for (let i = currentYear - 5; i < currentYear; i++) {
    years.push(i);
  }

  // Get the next 5 years
  for (let i = currentYear; i <= currentYear + 4; i++) {
    years.push(i);
  }

  return years;
}

export function generateISODate(
  year: number,
  month: number,
  day: number
): string {
  // Ensure the month is within the valid range (1 to 12)
  if (month < 1 || month > 12) {
    throw new Error('Month should be between 1 and 12.');
  }

  // Create a new Date object with the specified year and month (day defaults to 1)
  const date = new Date(year, month - 1, day);

  // Use toISOString to get the ISO date string
  const isoDate = date.toISOString();

  return isoDate;
}
