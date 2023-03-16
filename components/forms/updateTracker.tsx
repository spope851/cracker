import React, { useContext, useState } from "react"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  TextareaAutosize,
  Typography,
} from "@mui/material"
import { useQuery } from "@apollo/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { UserContext } from "@/context/userContext"
import { TODAYS_POST_QUERY } from "@/graphql/client/track/todaysPostQuery"

const OVERVIEW_CHAR_LIMIT = 480

export const UpdateTracker: React.FC = () => {
  const { refetch } = useContext(UserContext)
  const session = useSession()
  const router = useRouter()
  const [overview, setOverview] = useState<string>()
  const [numberCreativeHours, setNumberCreativeHours] = useState(0)
  const [rating, setRating] = useState(0)
  const { data, loading } = useQuery(TODAYS_POST_QUERY, {
    variables: { user: Number(session.data?.user.id) },
  })

  if (loading) return <>...loading</>

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <FormControl sx={{ width: "200%", alignSelf: "center", mb: 5 }}>
        <FormLabel>overview</FormLabel>
        <TextareaAutosize
          minRows={10}
          maxLength={OVERVIEW_CHAR_LIMIT}
          placeholder="what did you do today?"
          onChange={(e) => setOverview(e.target.value)}
          defaultValue={data?.todaysPost.overview}
        />
        <Typography textAlign="right" variant="caption">{`{ remaining: ${
          OVERVIEW_CHAR_LIMIT - (overview?.length || 0)
        } }`}</Typography>
      </FormControl>
      <FormControl sx={{ mb: 5 }}>
        <FormLabel>number creative hours</FormLabel>
        <Input
          defaultValue={data?.todaysPost.numberCreativeHours}
          type="number"
          inputProps={{ min: 0, max: 24, step: 0.5 }}
          onChange={(e) => setNumberCreativeHours(Number(e.target.value))}
        />
      </FormControl>
      <FormControl sx={{ mb: 5 }}>
        <FormLabel>rating</FormLabel>
        <Box display="flex" alignItems="center">
          {rating > 0 && "+"}
          <Input
            fullWidth
            defaultValue={data?.todaysPost.rating}
            type="number"
            inputProps={{ min: -2, max: 2 }}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </Box>
      </FormControl>
      <FormControl>
        <Button
          variant="outlined"
          disabled={!overview}
          onClick={() => {
            if (overview)
              track({
                variables: {
                  tracker: {
                    user: session.data?.user.id || "",
                    numberCreativeHours,
                    overview,
                    rating,
                  },
                },
              })
                .then(() => refetch({ refetch: true }))
                .finally(() => router.push("/"))
          }}
        >
          {loading ? "...processing" : "submit"}
        </Button>
      </FormControl>
    </form>
  )
}
