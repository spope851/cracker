import React, { useEffect, useState } from "react"

type Sentiment = {
  magnitude: number
  score: number
}

const Cloud: React.FC<{
  data: string
}> = ({ data }) => {
  const [sentiment, setSentiment] = useState<Sentiment>()

  useEffect(() => {
    ;(async () =>
      await fetch("/api/nlp", { method: "post", body: data })
        .then((res) => res.json())
        .then((res) => setSentiment(res.sentiment.documentSentiment)))()
  }, [])

  return <>{JSON.stringify(sentiment)}</>
}

export default Cloud
