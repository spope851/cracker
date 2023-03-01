import { Typography } from "@mui/material"
import React from "react"
import { WordcloudQueryQuery } from "@/generated/graphql"
import { useRouter } from "next/router"

const Wordcloud: React.FC<{
  loading: boolean
  data: WordcloudQueryQuery["dashboard"]["dashboard"]
}> = ({ loading, data }) => {
  const id = useRouter().query.id as "30" | "60" | "90"
  if (loading) return <>...loading</>

  const { thirtyDayWordcloud, sixtyDayWordcloud, ninetyDayWordcloud } = data!

  const wordclouds = {
    "30": thirtyDayWordcloud,
    "60": sixtyDayWordcloud,
    "90": ninetyDayWordcloud,
  }

  return (
    <Typography mx={10} sx={{ wordWrap: "break-word", wordBreak: "break-all" }}>
      {wordclouds[id]}
    </Typography>
  )
}

export default Wordcloud
