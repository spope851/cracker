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
import { UserContext } from "@/context/userContext"
import { UPDATE_TRACKER_MUTATION } from "@/graphql/client/track/updateTrackerMutation"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

const OVERVIEW_CHAR_LIMIT = 480

export const UpdateTracker: React.FC = () => {
  const { lastPost, refetch } = useContext(UserContext)
  const session = useSession()
  const router = useRouter()

  const { overview, numberCreativeHours, rating, id } = lastPost!
  const [updateTracker, { data: _data, loading }] = useMutation(
    UPDATE_TRACKER_MUTATION
  )

  const [updatedOverview, setOverview] = useState(overview)
  const [updatedNumberCreativeHours, setNumberCreativeHours] =
    useState(numberCreativeHours)
  const [updatedRating, setRating] = useState(rating)

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <FormControl sx={{ width: "200%", alignSelf: "center", mb: 5 }}>
        <FormLabel>overview</FormLabel>
        <TextareaAutosize
          minRows={10}
          maxLength={OVERVIEW_CHAR_LIMIT}
          placeholder="what did you do today?"
          onChange={(e) => setOverview(e.target.value)}
          defaultValue={overview}
        />
        <Typography textAlign="right" variant="caption">{`{ remaining: ${
          OVERVIEW_CHAR_LIMIT - (updatedOverview?.length || 0)
        } }`}</Typography>
      </FormControl>
      <FormControl sx={{ mb: 5 }}>
        <FormLabel>number creative hours</FormLabel>
        <Input
          defaultValue={numberCreativeHours}
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
            defaultValue={rating}
            type="number"
            inputProps={{ min: -2, max: 2 }}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </Box>
      </FormControl>
      <FormControl>
        <Button
          variant="outlined"
          disabled={!updatedOverview}
          onClick={() => {
            if (overview)
              updateTracker({
                variables: {
                  tracker: {
                    user: session.data?.user.id || "",
                    numberCreativeHours: updatedNumberCreativeHours,
                    overview: updatedOverview,
                    rating: updatedRating,
                    id,
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
