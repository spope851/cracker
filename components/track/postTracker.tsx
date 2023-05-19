import React, { useContext, useState } from "react"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { UserContext } from "@/context/userContext"
import { TRACKER_MUTATION } from "@/graphql/client"
import { Tracker } from "../forms"
import { ensurePunctuation } from "@/utils/stringUtils"
import { useSession } from "next-auth/react"
import { ModalContext } from "@/context/modalContext"
import { NoAuthModal } from "./noAuthModal"

export const PostTracker: React.FC = () => {
  const { refetch } = useContext(UserContext)
  const { setModalOpen, setModalContent } = useContext(ModalContext)
  const router = useRouter()
  const session = useSession()
  const [overview, setOverview] = useState<string>()
  const [numberCreativeHours, setNumberCreativeHours] = useState(0)
  const [rating, setRating] = useState(0)
  const [track, { data: _data, loading }] = useMutation(TRACKER_MUTATION)

  const submit = () => {
    if (overview)
      track({
        variables: {
          tracker: {
            numberCreativeHours,
            overview: ensurePunctuation(overview.trim()),
            rating,
          },
        },
      })
        .then(() => refetch({ refetch: true }))
        .finally(() => router.push("/"))
  }

  const unauthenticated = () => {
    setModalOpen(true)
    setModalContent(<NoAuthModal />)
  }

  const onSubmit = () =>
    session.status === "authenticated" ? submit() : unauthenticated()

  return (
    <Tracker
      overview={{
        value: overview,
        setter: setOverview,
      }}
      numberCreativeHours={{
        value: numberCreativeHours,
        setter: setNumberCreativeHours,
      }}
      rating={{
        value: rating,
        setter: setRating,
      }}
      loading={loading}
      onSubmit={onSubmit}
    />
  )
}
