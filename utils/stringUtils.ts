const postgresErrorDetails = (details: string): string[] => details.split(/[()]+/)

const fromToday = (lastPost?: string): boolean => {
  const today = new Date()
  const utcToday = `${
    today.getUTCMonth() + 1
  }/${today.getUTCDate()}/${today.getUTCFullYear()}`

  return lastPost === utcToday
}

export { postgresErrorDetails, fromToday }
