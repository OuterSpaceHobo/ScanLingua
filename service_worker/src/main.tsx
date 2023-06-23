import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import store from "./store.js";

store.subscribe(() => {
  const storeNow = store.getState()
  // console.log('storeNow', storeNow)
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Provider>
  </React.StrictMode>
)
