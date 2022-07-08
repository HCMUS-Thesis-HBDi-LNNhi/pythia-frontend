import { CONTINENTS, COUNTRIES } from "const/country-code.const";

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

export function removeDuplicateObjects<T>(array: T[]): T[] {
  return Array.from(
    new Set(array.map((value: T) => JSON.stringify(value)))
  ).map((value: string) => JSON.parse(value));
}

const countries = Object.values(COUNTRIES);
export const getContinentCode = (name: string) => {
  const result = countries.find((value) => value.name === name);
  return result && (result.continent as keyof typeof CONTINENTS);
};
