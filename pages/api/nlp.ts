import { NextApiRequest, NextApiResponse } from "next"
import language from "@google-cloud/language"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

  res.json(annotate)
}
