const sentimentColor = (
  score: number
): "red" | "lime" | "paleGreen" | "yellow" | "lightCoral" => {
  if (score === 2) return "lime"
  else if (score === 1) return "paleGreen"
  else if (score === 0) return "yellow"
  else if (score === -1) return "lightCoral"
  else return "red"
}

export { sentimentColor }
