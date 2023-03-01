const postgresErrorDetails = (details: string): string[] => details.split(/[()]+/)

export { postgresErrorDetails }
