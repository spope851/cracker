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
import { useMutation } from "@apollo/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { UserContext } from "@/context/userContext"
import { TRACKER_MUTATION } from "@/graphql/client"

const OVERVIEW_CHAR_LIMIT = 480

export const Tracker: React.FC = () => {
  const { refetch } = useContext(UserContext)
  const session = useSession()
  const router = useRouter()
  const [overview, setOverview] = useState<string>()
  const [numberCreativeHours, setNumberCreativeHours] = useState(0)
  const [rating, setRating] = useState(0)
  const [track, { data: _data, loading }] = useMutation(TRACKER_MUTATION)

  return (
    <Grid container flexDirection="column" rowGap={5} md={4}>
      <FormControl>
        <FormLabel>overview</FormLabel>
        <TextareaAutosize
          minRows={10}
          maxLength={OVERVIEW_CHAR_LIMIT}
          placeholder="what did you do today?"
          onChange={(e) => setOverview(e.target.value)}
        />
        <Typography textAlign="right" variant="caption">{`{ remaining: ${
          OVERVIEW_CHAR_LIMIT - (overview?.length || 0)
        } }`}</Typography>
      </FormControl>
      <Grid container columnSpacing={5}>
        <Grid container item md={6}>
          <FormControl fullWidth>
            <TextField
              label="number creative hours"
              defaultValue={0}
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
              defaultValue={0}
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
    </Grid>
  )
}
