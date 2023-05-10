import { Modal } from "@mui/material"
import React, { JSXElementConstructor, ReactElement, useState } from "react"
import { ModalContext } from "../modalContext"

export const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setModalOpen] = useState(false)
  const [content, setModalContent] = useState<
    ReactElement<any, string | JSXElementConstructor<any>>
  >(<></>)

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setModalOpen(false)
  }

  return (
    <ModalContext.Provider value={{ setModalContent, setModalOpen }}>
      {children}
      <Modal open={open} onClose={handleClose}>
        {content}
      </Modal>
    </ModalContext.Provider>
  )
}
