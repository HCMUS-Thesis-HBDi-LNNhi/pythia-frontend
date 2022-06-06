export const formatDate = (
  date: Date,
  formatType: string = "en-AU"
): string => {
  const dateString = new Intl.DateTimeFormat(formatType).format(date);
  const timeString = new Intl.DateTimeFormat(formatType, {
    timeStyle: "medium",
  }).format(date);
  return dateString + ", " + timeString;
};
