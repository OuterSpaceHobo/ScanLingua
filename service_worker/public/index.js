import { unEscape, captureZone, getCurrentTab, readStorage } from '/service.js'
import { AnnotateJpZone, translateZone, visionZone, audioZone, AddAnkiCard, AddKanjiCard } from '/fetch.js'

(async function() { 

let vision, visionText, userApi, apiCount, translation, jpAnnotation, b64, b64audio

chrome.commands.onCommand.addListener( async (command) => {
    const currentTab = await getCurrentTab()
    // console.log("currentTab", currentTab)
    if (command === "take-screenshot") {
        startScreenshot();
        // console.log('startScreenshot')
    }
}) // starter listener
  
async function startScreenshot(msg) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {type: "start-screenshot"});
    // console.log("sendMessage response", response);
} 

async function sendVision(requestId, vision) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {type: "your-vision", requestId, vision});
    incrementCount() // count only vision
    // console.log("sendVision response", response);
} 

async function sendTranslation(requestId, translation) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {type: "your-translation", requestId, translation});
    // incrementCount() // count with edits
    // console.log("sendTranslation response", response);
} 

async function sendAudio(requestId, b64audio) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {type: "your-b64audio", requestId, b64audio});
    // console.log("sendAudio response", response);
} 

async function sendJpAnnotation(requestId, jpAnnotation) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {type: "your-jpAnnotation", requestId, jpAnnotation});
    // console.log("sendJpAnnotation response", response);
} 

async function sendAnkiResult(requestId, addedCard) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {type: "your-sendAnkiResult", requestId, addedCard});
    // console.log("sendAnkiResult response", response);
} 

chrome.runtime.onMessage.addListener(gotMessage);
async function gotMessage(request, sendResponse) {
        //   console.log("ready to crop", request);
    if (request.type == "request-vision") {
        b64 = await captureZone(request.x1, request.y1, request.x2, request.y2, request.pixelRatio, request.tabHeight, request.tabWidth);
        // console.log("b64", b64)
        const [viz, vizText] = await visionZone(b64, userApi)
        vision = viz
        visionText = vizText
        // console.log("visionText", visionText, "vision", vision)
        await sendVision(request.requestId, visionText)
        chrome.storage.local.set({ "b64pic": b64 })
        // chrome.storage.local.set({ "b64pic": b64 }).then(() => {
        //     console.log("b64pic saved", b64);
        // }); // save b64pic for anki 
        chrome.storage.local.set({ "visionText": visionText })
        // chrome.storage.local.set({ "visionText": visionText }).then(() => {
        //     console.log("visionText saved", visionText);
        // }); // save visionText for anki 
    }
    if (request.type == "request-translation") { 
        // console.log("my request.editedText and request.userApi", request.editedText, request.userApi)
        if (request.editedText !== undefined) {
            // console.log("new edit translation req", request.editedText)
            visionText = await request.editedText
            userApi = await request.userApi // api preload
        } // edit kanji
        const rawTranslation = await translateZone(visionText, userApi)
        translation = await unEscape(rawTranslation) 
        // console.log("translation", translation)
        await sendTranslation(request.requestId, translation)
        chrome.storage.local.set({ "visionText": visionText })
        // chrome.storage.local.set({ "visionText": visionText }).then(() => {
        //     console.log("visionText saved", visionText);
        // }); // save edited visionText for anki 
        chrome.storage.local.set({ "translation": translation })
        // chrome.storage.local.set({ "translation": translation }).then(() => {
        //     console.log("translation saved", translation);
        // }); // save end translation for anki 
    }
    if (request.type == "request-audio") {
        if (translation === "Japanese text not detected.") {
            // console.log("not ja text for audio")
            b64audio = "no audio"
            await sendAudio(request.requestId, b64audio)
        } // not ja 
        b64audio = await audioZone(visionText, userApi)
        // console.log("b64audio", b64audio)
        await sendAudio(request.requestId, b64audio)
        chrome.storage.local.set({ "b64audio": b64audio })
        // chrome.storage.local.set({ "b64audio": b64audio }).then(() => {
        //     console.log("b64audio saved", b64audio);
        // }); // save audio for anki 
    }
    if (request.type == "request-jpAnnotation") {
        if (translation === "Japanese text not detected.") {
            // console.log("not ja text for annotation")
            jpAnnotation = "no annotation"
            await sendJpAnnotation(request.requestId, jpAnnotation)
        } // not ja 
        jpAnnotation = await AnnotateJpZone(visionText)
        // console.log("jpAnnotation", jpAnnotation)
        await sendJpAnnotation(request.requestId, jpAnnotation)
    }
    if (request.type == "request-AddAnkiCard") {
        b64 = await readStorage("b64pic") 
        b64audio = await readStorage("b64audio")
        visionText = await readStorage("visionText")
        translation = await readStorage("translation")
        // TODO test set and get jpAnnotation
        if (request.kanjiCard !== undefined) {
            const kanjiData = request.kanjiCard
            const addedCard = await AddKanjiCard(visionText, b64, translation, b64audio, kanjiData) 
            // console.log("addedCard", addedCard)
            await sendAnkiResult(request.requestId, addedCard)
        } else {
            const addedCard = await AddAnkiCard(visionText, b64, translation, b64audio) 
            // console.log("addedCard", addedCard)
            await sendAnkiResult(request.requestId, addedCard)
        }
    } // add anki / kanji cards
    if (request.type == "updated_API") {
        userApi = request.userApi
        // console.log("updated_API", request.userApi)
    }
    if (request.type == "reset-counter") {
        // console.log("reset-counter called");
        apiCount = 0
    }
    //sendResponse
}

chrome.storage.local.get(["setApi"], (result) => {
    userApi = result.setApi
}) // user api key preload

chrome.storage.local.get(["counter"], (result) => {
    apiCount = result.counter
    // console.log('onload apiCount', apiCount)
    if (!apiCount) {
        // console.log('!apiCount called')
        apiCount = 0
        chrome.storage.local.set({ "counter": apiCount })
        // chrome.storage.local.set({ "counter": apiCount }).then(() => {
        //     console.log("counter set to", apiCount);
        // });
    }
}) // user counter set/preload

async function incrementCount () {
    // console.log("incrementCount called");
    apiCount++
    chrome.storage.local.set({ "counter": apiCount })
    // chrome.storage.local.set({ "counter": apiCount }).then(() => {
    //     console.log("counter", apiCount);
    // });
} // increment counter

})()