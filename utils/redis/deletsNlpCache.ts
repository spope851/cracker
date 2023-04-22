import redis from "."

const nlpCaches = ["30", "60", "90", "365"]

export const deleteNlpCache = async (user: string) =>
  Promise.all(
    nlpCaches.map(
      async (cache) =>
        await redis
          .del(`nlp/${user}/${cache}`)
          .then(async () => await redis.del(`metrics/${user}/${cache}`))
    )
  )
