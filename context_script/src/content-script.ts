export{}

import { init, showOverlay, hideOverlay, showZone, fancyCursor, autoCursor, deInit } from './init'
import { renderOverlay } from './renderOverlay'
import { reactResponce, deReact } from './reactResponce'
import store from "./store.js"
import { initializeCoords } from './reducers/coordsReducer'
import { gotMessage } from './messages'

export let translation: string

(async function() {
    chrome.runtime.onMessage.addListener(gotMessage)
    // console.log("content-script.js started")
    document.body.style.overflow = "auto"; // test flow
})()

export function startScreenshot() {
    deInit() 
    deReact() 
    document.removeEventListener('keydown', escClear, false);   
    document.removeEventListener('mousedown', mouseDownLog, false); 
    init() 
    fancyCursor() 
    document.addEventListener('mousedown', mouseDownLog, false); 
    document.addEventListener('mouseup', mouseUpLog, false); 
    document.addEventListener('keydown', escClear, false);   
}

let x1: number, y1: number

function mouseDownLog (event: MouseEvent) {
    showOverlay()
    x1 = event.clientX;
    y1 = event.clientY;
    document.addEventListener('mousemove', mouseMoveLog, false);
    document.body.style.overflow = "hidden";
    void document.title
    // console.log(`mouse down: ${x1}, ${y1}`)
}
    
const pixelRatio = window.devicePixelRatio
// console.log("pixelRatio", pixelRatio)
const tabHeight = document.documentElement.clientHeight
// console.log("tabHeight", tabHeight)
const tabWidth = document.documentElement.clientWidth
// console.log("tabWidth", tabWidth)

async function mouseUpLog (event: MouseEvent) {
    hideOverlay()
    autoCursor()
    const x2 = event.clientX;
    const y2 = event.clientY;

    document.removeEventListener('mousemove', mouseMoveLog, false);
    document.removeEventListener('mousedown', mouseDownLog, false); 
    document.removeEventListener('mouseup', mouseUpLog, false); 

    const coords = {
        x1: x1,
        y1: y1, 
        x2: x2, 
        y2: y2, 
    } 
    store.dispatch(initializeCoords(coords)) 

    reactResponce()
    // console.log(`mouse up: ${x2}, ${y2}`)
}

function mouseMoveLog (event: MouseEvent) {
    showZone()
    const x2 = event.clientX;
    const y2 = event.clientY;
    renderOverlay(x1, y1, x2, y2)
    // console.log(`move: ${x2}, ${y2}`)
}

function escClear (event: KeyboardEvent) {
    if (event.keyCode === 27) {
        deInit()
        deReact() 
        // console.log("cleaned")
        document.removeEventListener('keydown', escClear, false);   
        document.removeEventListener('mousedown', mouseDownLog, false); 
    }
    return false
}


