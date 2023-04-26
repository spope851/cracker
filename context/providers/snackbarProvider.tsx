import { IconButton, Snackbar } from "@mui/material"
import React, { useState } from "react"
import { SnackbarContext } from "../snackbarContext"
import CloseIcon from "@mui/icons-material/Close"

export const SnackbarContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setSnackbarOpen] = useState(false)
  const [message, setSnackbarMessage] = useState<string>()

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setSnackbarOpen(false)
  }

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )

  return (
    <SnackbarContext.Provider value={{ setSnackbarMessage, setSnackbarOpen }}>
      {children}
      <Snackbar
        open={open}
        ContentProps={{ sx: { color: "#000", bgcolor: "#ddd" } }}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </SnackbarContext.Provider>
  )
}
