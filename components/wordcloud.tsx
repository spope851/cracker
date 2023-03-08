import { Button, Typography } from "@mui/material"
import React from "react"
import { WordcloudQueryQuery } from "@/generated/graphql"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

const Wordcloud: React.FC<{
  loading: boolean
  data: WordcloudQueryQuery["dashboard"]["dashboard"]
}> = ({ loading, data }) => {
  const router = useRouter()
  const id = router.query.id as "30" | "60" | "90"
  const session = useSession()
  if (session.status !== "authenticated") return <>you are not authenticated</>
  if (loading) return <>...loading</>
  if (data?.ninetyDayWordcloud === undefined)
    return (
      <Button onClick={() => router.push("/track")} variant="outlined">
        no data... click to track
      </Button>
    )

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
