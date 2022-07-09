export const defaultColors: string[] = [
  "skyBlue",
  "royalBlue",
  "darkBlue",
  "darkGreen",
  "seaGreen",
  "lightGreen",
  "wheat",
  "yellow",
  "gold",
  "orange",
  "darkOrange",
  "chocolate",
  "darkRed",
  "red",
  "orangeRed",
  "lightPink",
  "paleVioletRed",
  "deepPink",
  "purple",
  "violet",
  "thistle",
];

export function getSingleChartColor(color: string = defaultColors[0]) {
  return {
    backgroundColor: color,
    borderColor: color,
  };
}

export function getMultipleChartColors(
  config: {
    colors?: string[];
    index?: number;
  } = {}
) {
  const { index = 0, colors = defaultColors } = config;
  const result = index < colors.length ? colors[index] : colors[0];
  return {
    backgroundColor: result,
    borderColor: result,
  };
}
