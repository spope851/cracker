const ratingColor = (
  score?: number
): "red" | "lime" | "paleGreen" | "yellow" | "lightCoral" | "#fff" => {
  if (!score) return "#fff"
  if (score === 2) return "lime"
  else if (score === 1) return "paleGreen"
  else if (score === 0) return "yellow"
  else if (score === -1) return "lightCoral"
  else return "red"
}

const sentimentColor = (
  score?: number | null
): "lightCoral" | "paleGreen" | "#fff" => {
  if (!score) return "#fff"
  if (score > 0) return "paleGreen"
  if (score < 0) return "lightCoral"
  return "#fff"
}

const aboveAverage = (avgHours: number, numberCreativeHours?: number) => {
  if (!numberCreativeHours) return "#fff"
  else return numberCreativeHours > avgHours ? "paleGreen" : "lightCoral"
}

export { ratingColor, sentimentColor, aboveAverage }
