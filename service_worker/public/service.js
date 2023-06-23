export const readStorage = async (key) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([key], function (result) {
        if (result[key] === undefined) {
          reject();
        } else {
          resolve(result[key]);
        }
      });
    });
}; // storage async preload

export async function unEscape(translation) {
    // console.log('imported unEscape called')
    if (translation === "" || translation === "Japanese text not detected.") {
        return translation
    }
    translation = translation.data.translations[0].translatedText
    translation = translation.replace(/&lt;/g , "<");	 
    translation = translation.replace(/&gt;/g , ">");     
    translation = translation.replace(/&quot;/g , "\"");  
    translation = translation.replace(/&#39;/g , "\'");   
    translation = translation.replace(/&amp;/g , "&");
    return translation;
} // clean rawTranslation

export async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
} // current tab for starter

export async function captureZone(x1, y1, x2, y2, pixelRatio) {
    
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
    return base64result  

} // crop finctionality
