async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

(async function() { 

chrome.commands.onCommand.addListener( async (command) => {

    const currentTab = await getCurrentTab()
    // console.log("currentTab", currentTab)

    if (command === "take-screenshot") {
        startScreenshot();
    }
})
  
async function startScreenshot(msg) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {type: "start-screenshot"});
    // console.log("sendMessage response", response);
} 

async function sendVision(requestId, vision) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {type: "your-vision", requestId, vision});
    incrementCount() // test
    // console.log("sendVision response", response);
} 

async function sendTranslation(requestId, translation) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {type: "your-translation", requestId, translation});
    // console.log("sendTranslation response", response);
} 

async function sendJpAnnotation(requestId, jpAnnotation) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {type: "your-jpAnnotation", requestId, jpAnnotation});
    // console.log("sendJpAnnotation response", response);
} 

chrome.runtime.onMessage.addListener(gotMessage);

async function gotMessage(request, sendResponse) {
        //   console.log("ready to crop", request);
    if (request.type == "request-vision") {
        const vision = await captureZone(request.x1, request.y1, request.x2, request.y2, request.pixelRatio, request.tabHeight, request.tabWidth);
        // console.log("vision", vision)
        await sendVision(request.requestId, vision)
    }
    if (request.type == "request-translation") {
        const rawTranslation = await translateZone(visionText)
        const translation = await unEscape(rawTranslation)
        // console.log("translation", translation)
        await sendTranslation(request.requestId, translation)
    }
    if (request.type == "request-jpAnnotation") {
        const jpAnnotation = await AnnotateJpZone(visionText)
        // console.log("jpAnnotation", jpAnnotation)
        await sendJpAnnotation(request.requestId, jpAnnotation)
    }
    if (request.type == "updated_API") {
        userApi = request.userApi
        // console.log("updated_API", request.userApi)
    }
    if (request.type == "reset-counter") {
        apiCount = 0
        chrome.storage.local.set({ "counter": apiCount }).then(() => {
            console.log("counter", apiCount);
        });
    }
    //sendResponse
}

let vision, visionText, userApi
let apiCount = 0

chrome.storage.local.get(["setApi"], (result) => {
    userApi = result.setApi
}) // user api key

async function incrementCount () {
    apiCount++
    chrome.storage.local.set({ "counter": apiCount }).then(() => {
        // console.log("counter", apiCount);
    });
} // counter

async function captureZone(x1, y1, x2, y2, pixelRatio, tabHeight, tabWidth) {
    
    if (x1 > x2) {
        const tmp = x2
        x2 = x1
        x1 = tmp
    }
    if (y1 > y2) {
        const tmp = y2
        y2 = y1
        y1 = tmp
    }

    //full screen

    // console.log("taking dat screenshot");
    let capturing = chrome.tabs.captureVisibleTab({format: "png"});

    const imageUri = await capturing;
    // console.log("imageUri", imageUri)

    const blob = await (await fetch(imageUri)).blob(); 
    // console.log("blob", blob)

    const imgBitMap = await createImageBitmap(blob)
    // console.log("imgBitMap", imgBitMap)
        
    // canvas

    const dWidth = (x2 - x1)
    const dHeight = (y2 - y1) 

    // console.log(dWidth, dHeight)
    const canvas = new OffscreenCanvas(dWidth, dHeight);
    const ctx = canvas.getContext('2d');
    // console.log("ctx", ctx)

    ctx.drawImage(imgBitMap, (x1 * pixelRatio), (y1 * pixelRatio), dWidth * pixelRatio, dHeight * pixelRatio, 0, 0, dWidth, dHeight)

    const imgPngBlob = await canvas.convertToBlob()
    // console.log('imgPngBlob', imgPngBlob)

    const base64data = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(imgPngBlob)
        reader.onloadend = function () {
            const base64data = reader.result
            resolve(base64data)
        }
    }) 

    // console.log("base64data", base64data)

    {
        const imgBitMap = canvas.transferToImageBitmap()
        // console.log("imgBitMap", imgBitMap)
    }

    const base64result = base64data.split(',')[1];

    // console.log("base64result", base64result)
    
    // fetch 

    try {
        const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${userApi}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                        },
            body: JSON.stringify({
                    "requests":[
                        {
                        "image":{ 
                            "content": base64result
                        },
                        "features":[
                            {
                            "type":"TEXT_DETECTION",
                            }
                        ]
                        }
                    ]
            })
        })
        vision = await response.json() 
         console.log("vision", vision);

        if (vision.error?.message === "API key not valid. Please pass a valid API key.") {
            visionText =  "API key not valid. Please pass a valid API key."
        } else if (vision.error?.code === 429) {
            visionText =  "Defauil API key limits exhausted."
        } else if (vision.responses[0].fullTextAnnotation === undefined) {
            visionText =  "No text detected."
        } else {
            visionText = await vision.responses[0].fullTextAnnotation.text.replaceAll("\n"," ")
        }
         console.log("visionText", visionText);

        return vision, visionText

    } catch (error) {
        console.log(error)
        
        visionText =  "API key not valid. Please pass a valid API key."

        return visionText
    }
} 

async function translateZone(visionText) {

    if (visionText === "No text detected.") {
        const translation = ""
        return translation
    } 
    else if (visionText === "API key not valid. Please pass a valid API key.") {
        const translation = ""
        return translation    
    }

    try {
        const translate = await fetch(`https://translation.googleapis.com/language/translate/v2/?key=${userApi}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json, charset=utf-8"
                        },
            body: JSON.stringify({
                q: visionText,
                target: `en` 
            })
        })
        const translation = await translate.json()
        // console.log("translation", translation);

        return translation

    } catch (error) {
        console.log(error)
    }
}

async function unEscape(translation) {

    if (translation === "") {
        return translation
    }

    translation = translation.data.translations[0].translatedText
    translation = translation.replace(/&lt;/g , "<");	 
    translation = translation.replace(/&gt;/g , ">");     
    translation = translation.replace(/&quot;/g , "\"");  
    translation = translation.replace(/&#39;/g , "\'");   
    translation = translation.replace(/&amp;/g , "&");
    return translation;
}

async function AnnotateJpZone(visionText) {

    try {
    const translate = await fetch("https://jotoba.de/api/search/kanji", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
                    },
        body: JSON.stringify({
            "query": visionText,
            "language": "English",
            "no_english": false
          })
    })
    const jpAnnotation = await translate.json()
    // console.log("jpAnnotation", jpAnnotation);

    return jpAnnotation

    } catch (error) {
        console.log(error)
    }
}

})()