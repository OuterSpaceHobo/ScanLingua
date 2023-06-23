import { startScreenshot } from "./content-script"

export let userApi: string

const requests: Map<number, any> = new Map() // map [string] promise

    export async function requestVision (x1: number, y1: number, x2: number, y2: number) {
        const pixelRatio = window.devicePixelRatio 
        const requestId = getRandomInt(100000) 
        const response = await chrome.runtime.sendMessage({type: "request-vision", requestId, x1, y1, x2, y2, pixelRatio}); 
        const res = await new Promise((resolve, reject) => {
            requests.set(requestId, resolve) 
            setTimeout(reject, 10*1000) //10sec
        })
        return res
    }

    export async function requestTranslation (editedText: any) {
        const requestId = getRandomInt(100000) 
        chrome.storage.local.get(["setApi"], (result) => {
            userApi = result.setApi
        }) // user api key preload for edit
        const response = await chrome.runtime.sendMessage({type: "request-translation", requestId, editedText, userApi}); 
        const res = await new Promise((resolve, reject) => {
            requests.set(requestId, resolve) 
            setTimeout(reject, 60*1000) //60sec
        })
        return res
    }

    export async function requestJpAudio () {
        const requestId = getRandomInt(100000) 
        const response = await chrome.runtime.sendMessage({type: "request-audio", requestId}); 
        const res = await new Promise((resolve, reject) => {
            requests.set(requestId, resolve) 
            setTimeout(reject, 60*1000) //60sec
        })
        return res
    }

    export async function requestJpAnnotation () {
        const requestId = getRandomInt(100000) 
        const response = await chrome.runtime.sendMessage({type: "request-jpAnnotation", requestId}); 
        const res = await new Promise((resolve, reject) => {
            requests.set(requestId, resolve) 
            setTimeout(reject, 10*1000) //10sec
        })
        return res
    }

    export async function requestAddAnkiCard (kanjiCard: any) {
        const requestId = getRandomInt(100000) 
        const response = await chrome.runtime.sendMessage({type: "request-AddAnkiCard", requestId, kanjiCard}); 
        const res = await new Promise((resolve, reject) => {
            requests.set(requestId, resolve) 
            setTimeout(reject, 10*1000) //10sec
        })
        return res
    }

    export function getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

    export async function gotMessage(request: { 
        type: string, 
        vision: any, 
        requestId: number, 
        translation: string, 
        jpAnnotation: any, 
        b64audio: string,
        addedCard: any, }
        ) {

        // console.log("got dat message", request);

        if (request.type === "start-screenshot") {
            startScreenshot();
        }        
        if (request.type === "your-vision") {
            const resolve = requests.get(request.requestId)
            if (resolve !== undefined) {
                resolve(request.vision)
            }
            requests.delete(request.requestId)
        }
        if (request.type === "your-translation") {
            const resolve = requests.get(request.requestId)
            if (resolve !== undefined) {
                resolve(request.translation)
            }
            requests.delete(request.requestId)
        }
        if (request.type === "your-jpAnnotation") {
            const resolve = requests.get(request.requestId)
            if (resolve !== undefined) {
                resolve(request.jpAnnotation)
            }
            requests.delete(request.requestId)
        }
        if (request.type === "your-b64audio") {
            const resolve = requests.get(request.requestId)
            if (resolve !== undefined) {
                resolve(request.b64audio)
            }
            requests.delete(request.requestId)
        }
        if (request.type === "your-sendAnkiResult") {
            const resolve = requests.get(request.requestId)
            if (resolve !== undefined) {
                resolve(request.addedCard)
            }
            requests.delete(request.requestId)
        } // anki rez test
    }