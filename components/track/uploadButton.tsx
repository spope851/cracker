import { Button } from "@mui/material"
import UploadFileIcon from "@mui/icons-material/UploadFile"
import React, { useContext } from "react"
import { useSession } from "next-auth/react"
import { ModalContext } from "@/context/modalContext"
import { NoAuthModal } from "./noAuthModal"

export const UploadButton: React.FC<{ setUpload: (upload: boolean) => void }> = ({
  setUpload,
}) => {
  const { setModalOpen, setModalContent } = useContext(ModalContext)
  const session = useSession()

  const unauthenticated = () => {
    setModalOpen(true)
    setModalContent(<NoAuthModal />)
  }

  const onClick = () =>
    session.status === "authenticated" ? setUpload(true) : unauthenticated()

  return (
    <Button variant="outlined" onClick={onClick} sx={{ alignSelf: "flex-end" }}>
      upload <UploadFileIcon />
    </Button>
  )
}
