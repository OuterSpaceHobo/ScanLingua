import ReactDOM from 'react-dom/client'
import App from './App'
import { idApp, topFrame, zoneFrame, leftFrame, rightFrame } from "./init"
import store from "./store.js"
import { Provider } from 'react-redux'
import { calcPosition } from './calcPosition'

store.subscribe(() => {
    const storeNow = store.getState()
    // console.log('storeNow', storeNow)
  })

const idReactFrame = `${idApp}ReactFrame`
let reactFrame: HTMLElement | null = null

export { reactFrame }

export async function reactResponce() {

    const tabHeight = document.documentElement.clientHeight

    reactFrame = document.getElementById(idReactFrame)
    if (reactFrame === null) {
        reactFrame = document.createElement("div")
        reactFrame.id = idReactFrame
        zoneFrame!.appendChild(reactFrame);
        reactFrame.style.position = `absolute`
        reactFrame.style.width = `405px`
        reactFrame.style.zIndex = `999999`

        const rightSpace = parseInt(rightFrame!.style.width)
        const leftSpace = parseInt(leftFrame!.style.width)
        const topSpace = parseInt(topFrame!.style.height)
        const zoneH = parseInt(zoneFrame!.style.height)
        const bottomSpace = tabHeight - topSpace - zoneH

        const pos = calcPosition(tabHeight, rightSpace, leftSpace, topSpace, bottomSpace)
        if (pos.left) reactFrame.style.left = pos.left
        if (pos.top) reactFrame.style.top = pos.top
        if (pos.bottom) reactFrame.style.bottom = pos.bottom
        // console.log("create root called")

        ReactDOM.createRoot(reactFrame).render(
            <>
                <Provider store={store}>
                    <App />
                </Provider>
            </>
        )
    }
}

export function deReact() {
    reactFrame?.parentNode!.removeChild(reactFrame!); reactFrame = null
}