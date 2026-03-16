import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Support } from './Support'
import { theme } from './extendTheme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <div style={{ padding: '1rem' }}>
        <Support window={true} />
      </div>
    </ChakraProvider>
  </React.StrictMode>
)
