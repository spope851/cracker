import { CACHE_KEYS } from "@/constants"
import redis from "."

const nlpCaches = ["30", "60", "90", "365"]

export const deleteNlpCache = async (user: string) =>
  Promise.all([
    await redis.del(`${CACHE_KEYS.basicDashboardWords}/${user}`),
    await redis.del(`${CACHE_KEYS.basicDashboardSentences}/${user}`),
    ...nlpCaches.map(
      async (cache) =>
        await redis
          .del(`${CACHE_KEYS.premiumDashboard}/${user}/${cache}`)
          .then(async () => await redis.del(`metrics/${user}/${cache}`))
    ),
  ])
