import React, { useContext, useState } from "react"
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material"
import { UserContext } from "@/context/userContext"
import { UPDATE_TRACKER_MUTATION } from "@/graphql/client/track/updateTrackerMutation"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { OVERVIEW_CHAR_LIMIT } from "@/constants"

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
    <Grid container flexDirection="column" rowGap={5} md={4}>
      <FormControl>
        <FormLabel>overview</FormLabel>
        <TextareaAutosize
          defaultValue={overview}
          minRows={10}
          maxLength={OVERVIEW_CHAR_LIMIT}
          placeholder="what did you do today?"
          onChange={(e) => setOverview(e.target.value)}
        />
        <Typography textAlign="right" variant="caption">{`{ remaining: ${
          OVERVIEW_CHAR_LIMIT - (updatedOverview?.length || 0)
        } }`}</Typography>
      </FormControl>
      <Grid container columnSpacing={5}>
        <Grid container item md={6}>
          <FormControl fullWidth>
            <TextField
              label="number creative hours"
              defaultValue={numberCreativeHours}
              type="number"
              inputProps={{ min: 0, max: 24, step: 0.5 }}
              onChange={(e) => setNumberCreativeHours(Number(e.target.value))}
            />
          </FormControl>
        </Grid>
        <Grid container item md={6}>
          <FormControl fullWidth>
            <TextField
              label="rating"
              defaultValue={rating}
              type="number"
              inputProps={{ min: -2, max: 2 }}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </FormControl>
        </Grid>
      </Grid>
      <FormControl>
        <Button
          variant="outlined"
          disabled={!updatedOverview}
          onClick={() => {
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
    </Grid>
  )
}
