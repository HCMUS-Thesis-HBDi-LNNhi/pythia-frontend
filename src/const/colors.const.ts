export const sequentialColors: string[] = [
  "#ff744e",
  "#ff874a",
  "#ff9948",
  "#ffaa49",
  "#ffb94f",
  "#ffc85a",
  "#ffd76e",
  "#ffe48f",
  "#ffefc9",
];

export const divergingColors: string[] = [
  "#ff744e",
  "#ff9948",
  "#ffb94f",
  "#ffd76e",
  "#ffefc9",
  "#86c899",
  "#6fab84",
  "#5f8d8a",
  "#466bad",
];

export function getSingleChartColor(color: string = sequentialColors[0]) {
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
  const { index = 0, colors = sequentialColors } = config;
  const result = index < colors.length ? colors[index] : colors[0];
  return {
    backgroundColor: result,
    borderColor: result,
  };
}
