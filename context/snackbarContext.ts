import { createContext } from "react"

interface SnackbarContextProps {
  setSnackbarOpen: (open: boolean) => void
  setSnackbarMessage: (message: string) => void
}

export const SnackbarContext = createContext<SnackbarContextProps>(
  {} as SnackbarContextProps
)
