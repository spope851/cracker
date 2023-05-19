import React, { useContext } from "react"
import { useRouter } from "next/router"
import { ModalContentWrapper } from "../wrappers"
import { Button, Typography } from "@mui/material"
import { ModalContext } from "@/context/modalContext"

export const NoAuthModal: React.FC = () => {
  const { setModalOpen } = useContext(ModalContext)
  const router = useRouter()

  const onClick = () => {
    router.push("/")
    setModalOpen(false)
  }

  return (
    <ModalContentWrapper>
      <Typography>You have to be authenticated to use this feature</Typography>
      <Button variant="outlined" onClick={onClick}>
        sign in
      </Button>
    </ModalContentWrapper>
  )
}
