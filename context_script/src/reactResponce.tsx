import ReactDOM from 'react-dom/client'
import App, {RequestVisionCallback , RequestTranslationCallback, RequestJpAnnotationCallback} from './App'
import {idApp, topFrame, zoneFrame, leftFrame, rightFrame} from "./init"

const idReactFrame = `${idApp}ReactFrame`
let reactFrame: HTMLElement | null = null

export { reactFrame }

export function reactResponce(x1: number, y1: number, x2: number, y2: number, translation: string, jpAnnotation: any, requestVision: RequestVisionCallback, requestTranslation: RequestTranslationCallback, requestJpAnnotation: RequestJpAnnotationCallback) {
    
    let tabWidth = document.documentElement.clientWidth
    let tabHeight = document.documentElement.clientHeight
 
    reactFrame = document.getElementById(idReactFrame)
    if (reactFrame === null) {
        reactFrame = document.createElement("div")
        reactFrame.id = idReactFrame
        zoneFrame!.appendChild(reactFrame); 
        reactFrame.style.position = `absolute`
        reactFrame.style.left = `calc(100% + 10px)`
        reactFrame.style.width = `405px`
        reactFrame.style.top = `-1px`
        
        if (parseInt(rightFrame!.style.width) < 415 ) {
            reactFrame.style.left = `-415px`
        }

        if (tabHeight - parseInt(topFrame!.style.height + zoneFrame!.style.height) < 250) {
            reactFrame.style.left = `-1px`
            reactFrame.style.bottom = `calc(+100% + 10px)`
            reactFrame.style.top = `unset`
        }

        if (tabWidth - parseInt(leftFrame!.style.width + zoneFrame!.style.width) < 410 && tabHeight - parseInt(topFrame!.style.height + zoneFrame!.style.height) < 250) {
            reactFrame.style.left = `-416px`
        }

        if (parseInt(rightFrame!.style.width) < 415 && parseInt(leftFrame!.style.width) < 415) {
            reactFrame.style.left = `-1px`
            reactFrame.style.bottom = `calc(+100% + 10px)`
            reactFrame.style.top = `unset`
        }

        if ((parseInt(rightFrame!.style.width) < 415 && parseInt(leftFrame!.style.width) < 415) && parseInt(topFrame!.style.height) < 250) {
            reactFrame.style.left = `-1px`
            reactFrame.style.bottom = `unset`
            reactFrame.style.top = `calc(100% + 10px)`
        }

        // console.log("create root called")

        ReactDOM.createRoot(reactFrame).render(
            // <React.StrictMode>
            <>
                <App x1={x1} x2={x2} y1={y1} y2={y2} translation={translation} jpAnnotation={jpAnnotation} requestVision={requestVision} requestTranslation={requestTranslation} requestJpAnnotation={requestJpAnnotation}/>
            </>
            // </React.StrictMode>
        )
    }
}

export function deReact() {
    reactFrame?.parentNode!.removeChild(reactFrame!); reactFrame = null
}