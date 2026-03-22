import './i18n'
import './tailwind.css'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from "./store.js";

store.subscribe(() => {
  const _storeNow = store.getState()
  // console.log('storeNow', _storeNow)
})

const isMac = /mac/i.test((navigator as any).userAgentData?.platform ?? navigator.platform)
if (!isMac) document.documentElement.classList.add('os-non-mac')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
      <Provider store={store}>
        <App />
      </Provider>
  </>
)

const popupOpenTime = Date.now()
chrome.runtime.sendMessage({ type: "analytics-event", name: "session_start", params: {} }).catch(() => {})
chrome.runtime.sendMessage({ type: "analytics-event", name: "popup_opened", params: {} }).catch(() => {})

window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        chrome.runtime.sendMessage({
            type: "analytics-event", name: "popup_closed",
            params: { duration_ms: Date.now() - popupOpenTime }
        }).catch(() => {})
    }
})
