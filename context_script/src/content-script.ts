export{}

import { init, showOverlay, hideOverlay, showZone, fancyCursor, autoCursor, deInit } from './init'
import { renderOverlay } from './renderOverlay'
import { reactResponce, deReact } from './reactResponce'
import store from "./store.js"
import { initializeCoords } from './reducers/coordsReducer'
import { gotMessage } from './messages'

export let translation: string
export let jpAnnotation: any

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

let x1: any, y1: any

function mouseDownLog (event: { clientX: any; clientY: any }) {
    showOverlay()
    x1 = event.clientX;
    y1 = event.clientY;
    document.addEventListener('mousemove', mouseMoveLog, false);
    document.body.style.overflow = "hidden"; 
    document.title
    // console.log(`mouse down: ${x1}, ${y1}`)
}
    
const pixelRatio = window.devicePixelRatio
// console.log("pixelRatio", pixelRatio)
const tabHeight = document.documentElement.clientHeight
// console.log("tabHeight", tabHeight)
const tabWidth = document.documentElement.clientWidth
// console.log("tabWidth", tabWidth)

async function mouseUpLog (event: { clientX: any; clientY: any }) {
    hideOverlay()
    autoCursor()
    let x2 = event.clientX;
    let y2 = event.clientY;

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

function mouseMoveLog (event: { clientX: any; clientY: any }) {
    showZone()
    let x2 = event.clientX;
    let y2 = event.clientY;
    renderOverlay(x1, y1, x2, y2)
    // console.log(`move: ${x2}, ${y2}`)
}

function escClear (event: { keyCode: number }) {
    if (event.keyCode === 27) {
        deInit()
        deReact() 
        // console.log("cleaned")
        document.removeEventListener('keydown', escClear, false);   
        document.removeEventListener('mousedown', mouseDownLog, false); 
    }
    return false
}


