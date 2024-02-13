import React, { ReactElement } from 'react'
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles'

const theme: Theme = createTheme({
  typography: {
    fontFamily: 'Londrina Shadow'
  }
})

export default function Theme(props: React.PropsWithChildren): ReactElement {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}
