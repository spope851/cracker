import { JSXElementConstructor, ReactElement, createContext } from "react"

interface ModalContextProps {
  setModalOpen: (open: boolean) => void
  setModalContent: (
    content: ReactElement<any, string | JSXElementConstructor<any>>
  ) => void
}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps)
