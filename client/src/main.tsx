import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, Stack, extendTheme } from '@chakra-ui/react'
import App from './App.tsx'
import './index.css'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#F9F9F9",
        color: "black",
        height: '100%'
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Stack w='70vw' alignItems={'center'}>
        <App />
      </Stack>
    </ChakraProvider>
  </React.StrictMode>,
)
