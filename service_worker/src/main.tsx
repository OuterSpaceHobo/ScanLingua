import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import store from "./store.js";
import { theme } from './extendTheme'

store.subscribe(() => {
  const _storeNow = store.getState()
  // console.log('storeNow', _storeNow)
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Provider>
  </React.StrictMode>
)

const popupOpenTime = Date.now()
chrome.runtime.sendMessage({ type: "analytics-event", name: "session_start", params: {} })
chrome.runtime.sendMessage({ type: "analytics-event", name: "popup_opened", params: {} })

window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        chrome.runtime.sendMessage({
            type: "analytics-event", name: "popup_closed",
            params: { duration_ms: Date.now() - popupOpenTime }
        })
    }
})
