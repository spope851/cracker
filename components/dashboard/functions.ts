const ratingColor = (
  score?: number
): "red" | "lime" | "paleGreen" | "yellow" | "lightCoral" | "#fff" => {
  if (score === undefined) return "#fff"
  else if (score === 2) return "lime"
  else if (score === 1) return "paleGreen"
  else if (score === 0) return "yellow"
  else if (score === -1) return "lightCoral"
  else return "red"
}

const sentimentColor = (
  score?: number | null
): "lightCoral" | "paleGreen" | "#fff" => {
  if (!score) return "#fff"
  else if (score > 0) return "paleGreen"
  else return "lightCoral"
}

const aboveAverage = (avgHours?: number, numberCreativeHours?: number) => {
  if (numberCreativeHours === undefined) return "#fff"
  else if (avgHours === undefined) return "#fff"
  else return numberCreativeHours > avgHours ? "paleGreen" : "lightCoral"
}

export { ratingColor, sentimentColor, aboveAverage }
