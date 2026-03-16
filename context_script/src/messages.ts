import { startScreenshot } from "./content-script"

const requests: Map<number, (value: unknown) => void> = new Map()

    export async function requestVision (x1: number, y1: number, x2: number, y2: number) {
        const pixelRatio = window.devicePixelRatio
        const requestId = getRandomInt(100000)
        console.log(`[msg] requestVision requestId=${requestId} BEFORE sendMessage`)
        const res = await new Promise<unknown>((resolve) => {
            requests.set(requestId, (value: unknown) => {
                console.log(`[msg] requestVision RESOLVED requestId=${requestId}`)
                resolve(value)
            })
            console.log(`[msg] requestVision requestId=${requestId} stored in map, map size=${requests.size}`)
            chrome.runtime.sendMessage({type: "request-vision", requestId, x1, y1, x2, y2, pixelRatio})
        })
        return res
    }

    export async function requestTranslation (editedText?: string) {
        const requestId = getRandomInt(100000)
        console.log(`[msg] requestTranslation requestId=${requestId} BEFORE sendMessage`)
        const res = await new Promise<unknown>((resolve) => {
            requests.set(requestId, (value: unknown) => {
                console.log(`[msg] requestTranslation RESOLVED requestId=${requestId}`)
                resolve(value)
            })
            console.log(`[msg] requestTranslation requestId=${requestId} stored in map, map size=${requests.size}`)
            chrome.runtime.sendMessage({type: "request-translation", requestId, editedText})
        })
        return res
    }

    export async function requestAnnotation (lang = 'ja') {
        const requestId = getRandomInt(100000)
        console.log(`[msg] requestAnnotation requestId=${requestId} lang=${lang} BEFORE sendMessage`)
        const res = await new Promise<unknown>((resolve) => {
            requests.set(requestId, (value: unknown) => {
                console.log(`[msg] requestAnnotation RESOLVED requestId=${requestId}`)
                resolve(value)
            })
            console.log(`[msg] requestAnnotation requestId=${requestId} stored in map, map size=${requests.size}`)
            chrome.runtime.sendMessage({type: "request-annotation", requestId, lang})
        })
        return res
    }

    export async function requestAddAnkiCard (kanjiCard: Record<string, string | number | undefined> | undefined) {
        const requestId = getRandomInt(100000)
        console.log(`[msg] requestAddAnkiCard requestId=${requestId} BEFORE sendMessage`)
        const res = await new Promise<unknown>((resolve) => {
            requests.set(requestId, (value: unknown) => {
                console.log(`[msg] requestAddAnkiCard RESOLVED requestId=${requestId}`)
                resolve(value)
            })
            console.log(`[msg] requestAddAnkiCard requestId=${requestId} stored in map, map size=${requests.size}`)
            chrome.runtime.sendMessage({type: "request-AddAnkiCard", requestId, kanjiCard})
        })
        return res
    }

    export function getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

    export async function gotMessage(request: {
        type: string,
        vision: unknown,
        requestId: number,
        translation: string,
        annotation: unknown,
        addedCard: unknown, }
        ) {

        console.log(`[msg] gotMessage type=${request.type} requestId=${request.requestId} map size=${requests.size}`)

        if (request.type === "start-screenshot") {
            startScreenshot();
        }
        if (request.type === "your-vision") {
            const resolve = requests.get(request.requestId)
            console.log(`[msg] your-vision requestId=${request.requestId} found=${resolve !== undefined}`)
            if (resolve !== undefined) {
                resolve(request.vision)
            }
            requests.delete(request.requestId)
        }
        if (request.type === "your-translation") {
            const resolve = requests.get(request.requestId)
            console.log(`[msg] your-translation requestId=${request.requestId} found=${resolve !== undefined}`)
            if (resolve !== undefined) {
                resolve(request.translation)
            }
            requests.delete(request.requestId)
        }
        if (request.type === "your-annotation") {
            const resolve = requests.get(request.requestId)
            console.log(`[msg] your-annotation requestId=${request.requestId} found=${resolve !== undefined}`)
            if (resolve !== undefined) {
                resolve(request.annotation)
            }
            requests.delete(request.requestId)
        }
        if (request.type === "your-sendAnkiResult") {
            const resolve = requests.get(request.requestId)
            console.log(`[msg] your-sendAnkiResult requestId=${request.requestId} found=${resolve !== undefined}`)
            if (resolve !== undefined) {
                resolve(request.addedCard)
            }
            requests.delete(request.requestId)
        } // anki rez test
    }