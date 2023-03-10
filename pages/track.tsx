import React, { useContext, useState } from "react"
import Head from "next/head"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  TextareaAutosize,
  Typography,
} from "@mui/material"
import { useMutation } from "@apollo/client"
import { graphql } from "@/generated"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { UserContext } from "@/context/userContext"

const OVERVIEW_CHAR_LIMIT = 480

export default function Track() {
  const router = useRouter()
  const session = useSession()
  const { hasPostedToday, refetch } = useContext(UserContext)
  const [overview, setOverview] = useState<string>()
  const [numberCreativeHours, setNumberCreativeHours] = useState(0)
  const [rating, setRating] = useState(0)
  const [track, { data: _data, loading }] = useMutation(
    graphql(`
      mutation TrackerMutation($tracker: TrackerInput!) {
        track(tracker: $tracker) {
          errors {
            message
            field
          }
          track {
            numberCreativeHours
            overview
            rating
            user
            id
          }
        }
      }
    `)
  )
  return (
    <>
      <Head>
        <title>creativity tracker</title>
      </Head>
      <Box display="flex" justifyContent="center" alignItems="center" mt="auto">
        {hasPostedToday ? (
          <Typography color="red">you have already posted today</Typography>
        ) : (
          <form style={{ display: "flex", flexDirection: "column" }}>
            <FormControl sx={{ width: "200%", alignSelf: "center", mb: 5 }}>
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
            <FormControl sx={{ mb: 5 }}>
              <FormLabel>number creative hours</FormLabel>
              <Input
                defaultValue={0}
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
                  defaultValue={0}
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
        )}
      </Box>
    </>
  )
}
