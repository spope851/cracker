import React, { useMemo } from "react"
import { createTheme, ThemeProvider as MuiProvider } from "@mui/material"
import { Inter } from "@next/font/google"

const DARK_GREY = "#999"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#4162ff",
          },
        },
        components: {
          MuiAccordion: {
            styleOverrides: {
              root: {
                border: `solid 2px ${DARK_GREY}`,
                "&:not(:first-child)": {
                  borderTop: `solid 1px ${DARK_GREY}`,
                },
                "&:not(:last-child)": {
                  borderBottom: `solid 1px ${DARK_GREY}`,
                },
                "&.Mui-expanded": {
                  border: `solid 2px ${DARK_GREY}`,
                },
              },
            },
          },
          MuiTabs: {
            styleOverrides: {
              scrollButtons: {
                "&.Mui-disabled": {
                  display: "none",
                },
              },
              root: {
                minHeight: "unset",
              },
            },
          },
        },
        typography: {
          fontFamily: inter.style.fontFamily,
        },
      }),
    []
  )

  return (
    <MuiProvider theme={theme}>
      <>{children}</>
    </MuiProvider>
  )
}
