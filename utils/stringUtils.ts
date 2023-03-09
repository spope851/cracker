const postgresErrorDetails = (details: string): string[] => details.split(/[()]+/)

const hasPostedToday = (lastPost?: string): boolean | void => {
  const today = new Date()
  const utcToday = `${
    today.getUTCMonth() + 1
  }/${today.getUTCDate()}/${today.getUTCFullYear()}`

  if (lastPost) return lastPost === utcToday
}

export { postgresErrorDetails, hasPostedToday }
