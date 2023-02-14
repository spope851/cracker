import React, { useMemo } from "react"
import { createTheme, ThemeProvider as MuiProvider } from "@mui/material"

const DARK_GREY = "#999"

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#4f864f",
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
      }),
    []
  )

  return (
    <MuiProvider theme={theme}>
      <>{children}</>
    </MuiProvider>
  )
}
