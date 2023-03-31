import { NextApiRequest, NextApiResponse } from "next"
import language from "@google-cloud/language"
import redis from "@/utils/redis"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"

// follow the documentation here to access the language api in your local environment: https://cloud.google.com/nodejs/docs/reference/language/latest#quickstart
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    user: { id: user },
  } = await getServerSession(req, res, authOptions)
  const cachedData = await redis.get(`nlp/${user}`)
  if (cachedData) res.json(JSON.parse(cachedData))
  // Instantiates a client
  const client = new language.LanguageServiceClient()

  const document = {
    content: req.body,
    type: "PLAIN_TEXT" as "PLAIN_TEXT",
  }

  const features = {
    extractSyntax: true,
    extractEntities: true,
    extractDocumentSentiment: true,
    extractEntitySentiment: true,
    classifyText: true,
  }

  // const [entities] = await client.analyzeEntities({ document })
  // const [entitySentiment] = await client.analyzeEntitySentiment({ document })
  // const [sentiment] = await client.analyzeSentiment({ document })
  // const [syntax] = await client.analyzeSyntax({ document })
  // const [classify] = await client.classifyText({ document })
  const [annotate] = await client.annotateText({ document, features })
  await redis.set(`nlp${user}`, JSON.stringify(annotate))
  res.json(annotate)
}
