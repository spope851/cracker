const postgresErrorDetails = (details: string): string[] => details.split(/[()]+/)

const fromToday = (lastPost?: string): boolean => {
  const today = new Date()
  const utcToday = `${
    today.getUTCMonth() + 1
  }/${today.getUTCDate()}/${today.getUTCFullYear()}`

  return lastPost === utcToday
}

const ensurePunctuation = (overview: string) =>
  [".", "?", "!"].includes(overview.slice(-1)) ? overview : `${overview}.`

export { postgresErrorDetails, fromToday, ensurePunctuation }
