export{}

import { init, showOverlay, hideOverlay, showZone, fancyCursor, autoCursor, deInit } from './init'
import { renderOverlay } from './renderOverlay'
import { reactResponce, deReact } from './reactResponce'

export let translation: string
export let jpAnnotation: any


(async function() {    
    
    // console.log("content-script.js started")

    const requests: Map<number, any> = new Map() // map [string] promise

    async function requestVision (x1: number, y1: number, x2: number, y2: number) {
        const pixelRatio = window.devicePixelRatio 
        const requestId = getRandomInt(100000) 
        const response = await chrome.runtime.sendMessage({type: "request-vision", requestId, x1, y1, x2, y2, pixelRatio}); 
        const res = await new Promise((resolve, reject) => {
            requests.set(requestId, resolve) 
            setTimeout(reject, 10*1000) //10sec
        })
        return res
    }

    async function requestTranslation () {
        const requestId = getRandomInt(100000) 
        const response = await chrome.runtime.sendMessage({type: "request-translation", requestId}); 
        const res = await new Promise((resolve, reject) => {
            requests.set(requestId, resolve) 
            setTimeout(reject, 60*1000) //60sec
        })
        return res
    }

    async function requestJpAnnotation () {
        const requestId = getRandomInt(100000) 
        const response = await chrome.runtime.sendMessage({type: "request-jpAnnotation", requestId}); 
        const res = await new Promise((resolve, reject) => {
            requests.set(requestId, resolve) 
            setTimeout(reject, 10*1000) //10sec
        })
        return res
    }

    function getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }
    
    chrome.runtime.onMessage.addListener(gotMessage);

    async function gotMessage(request: { type: string, vision: any, requestId: number, translation: string, jpAnnotation: any }) {
        // console.log("got dat message", request);

        if (request.type === "start-screenshot") {
            startScreenshot();
        }        

        if (request.type === "your-vision") {
            
            const resolve = requests.get(request.requestId)
            
            if (resolve !== undefined) {
                // console.log("resolve", request)
                resolve(request.vision)
            }
            // console.log("delete resolve")
            requests.delete(request.requestId)
        }
        if (request.type === "your-translation") {

            // console.log("request.translation", request.translation)

            const resolve = requests.get(request.requestId)

            if (resolve !== undefined) {
                // console.log("resolve", request)
                resolve(request.translation)
            }
            // console.log("delete resolve")
            requests.delete(request.requestId)
        }
        if (request.type === "your-jpAnnotation") {

            // console.log("request.jpAnnotation", request.jpAnnotation)

            const resolve = requests.get(request.requestId)

            if (resolve !== undefined) {
                // console.log("resolve", request)
                resolve(request.jpAnnotation)
            }
            // console.log("delete resolve")
            requests.delete(request.requestId)
        }
    }

    function startScreenshot() {
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
        document.body.style.overflowY = "hidden"; 

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

        reactResponce(x1, y1, x2, y2, translation, jpAnnotation, requestVision, requestTranslation, requestJpAnnotation)

        document.removeEventListener('mousemove', mouseMoveLog, false);
        document.removeEventListener('mousedown', mouseDownLog, false); 
        document.removeEventListener('mouseup', mouseUpLog, false); 
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

return 

})()

