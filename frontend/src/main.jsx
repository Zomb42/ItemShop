import { ChakraProvider } from '@chakra-ui/react'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
    <App/>
    </ChakraProvider>
  </StrictMode>,
)
