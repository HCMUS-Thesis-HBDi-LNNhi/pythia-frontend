export const sequentialColors: string[] = [
  "#ffd400",
  "#febd00",
  "#faa600",
  "#f58e00",
  "#ef7600",
  "#e95c00",
  "#e13d00",
  "#d90000",
];

export const divergingColors: string[] = [
  "#ff7a52",
  "#ff943e",
  "#ffaa2a",
  "#ffc013",
  "#bdd68f",
  "#83ab6a",
  "#4a8051",
  "#00563c",
];

export const qualitativeColors: string[] = [
  "#a6cee3",
  "#1f78b4",
  "#b2df8a",
  "#33a02c",
  "#fb9a99",
  "#e31a1c",
  "#fdbf6f",
  "#ff7f00",
  "#cab2d6",
  "#6a3d9a",
  "#ffff99",
  "#b15928",
];

export function getSingleChartColor(color: string = "#fc8d59") {
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
  const { index = 0, colors = qualitativeColors } = config;
  const result = index < colors.length ? colors[index] : colors[0];
  return {
    backgroundColor: result,
    borderColor: result,
  };
}
