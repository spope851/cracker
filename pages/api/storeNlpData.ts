import { MongoClient } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"
import redis from "@/utils/redis"
import * as keys from "@/utils/keys"
import { NLP_KEY } from "@/constants"

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  let numberOfDocuments = 0
  const date = new Date().toLocaleDateString()
  await MongoClient.connect(
    `mongodb://${keys.mongoUser}:${keys.mongoPassword}@${keys.serverHost}:${keys.mongoPort}`,
    {}
  ).then(async (client) => {
    await redis.keys(`${NLP_KEY}*`).then(
      async (keys) =>
        await redis.mget(keys).then(async (values) => {
          numberOfDocuments = keys.length
          await client
            .db(process.env.MONGO_DB)
            .collection(date)
            .insertMany(
              values.map((value, idx) => {
                const [_nlp, user, runningAvg] = keys[idx].split("/")
                return {
                  user,
                  runningAvg,
                  nlpData: JSON.parse(value || ""),
                }
              })
            )
        })
    )
  })

  res.send(
    `successfully added ${numberOfDocuments} documents to the collection "${date}"`
  )
}
