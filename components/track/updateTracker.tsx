import React, { useContext, useState } from "react"
import { UserContext } from "@/context/userContext"
import { UPDATE_TRACKER_MUTATION } from "@/graphql/client/track/updateTrackerMutation"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { Tracker } from "../forms"

export const UpdateTracker: React.FC = () => {
  const { lastPost, refetch } = useContext(UserContext)
  const session = useSession()
  const router = useRouter()

  const { overview, numberCreativeHours, rating, id } = lastPost!
  const [updateTracker, { data: _data, loading }] = useMutation(
    UPDATE_TRACKER_MUTATION
  )

  const [updatedOverview, setOverview] = useState<string | undefined>(overview)
  const [updatedNumberCreativeHours, setNumberCreativeHours] =
    useState(numberCreativeHours)
  const [updatedRating, setRating] = useState(rating)

  return (
    <Tracker
      overview={{
        value: updatedOverview,
        setter: setOverview,
      }}
      numberCreativeHours={{
        value: updatedNumberCreativeHours,
        setter: setNumberCreativeHours,
      }}
      rating={{
        value: updatedRating,
        setter: setRating,
      }}
      loading={loading}
      onSubmit={() => {
        if (updatedOverview)
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
    />
  )
}
