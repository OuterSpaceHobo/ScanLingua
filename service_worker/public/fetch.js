export async function AnnotateJpZone(visionText) {

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
} // fetch kanji 

export async function translateZone(visionText, userApi) {

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
                target: `en`,
                source: 'ja' // test
            })
        })
        let translation = await translate.json()
        // console.log("translation", translation)
        
        // const lang = translation.data?.translations[0]?.detectedSourceLanguage
        // if (lang !== "ja") {
        //     translation = "Japanese text not detected."
        // } // test lang lock

        return translation

    } catch (error) {
        console.log(error)
    }
} // fetch translation

export async function audioZone(visionText, userApi) {

    try {
        const audio = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${userApi}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json, charset=utf-8"
                        },
            body: JSON.stringify({
                "input":{
                    "text": visionText
                  },
                  "voice":{
                    "languageCode":"ja-JP",
                    "name":"ja-JP-Wavenet-B",
                    "ssmlGender":"FEMALE"
                  },
                  "audioConfig":{
                    "audioEncoding":"MP3"
                  }
            })
        })
        const textAudio = await audio.json()
        // console.log("text-to-speech raw result", textAudio);

        return textAudio

    } catch (error) {
        console.log(error)
    }
} // fetch text-to-speech

export async function visionZone(base64result, userApi) { 
    let vision, visionText, translation

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
                                },
                            ],
                            "imageContext": {
                                "languageHints": [
                                "ja"
                                ], 
                            }, 
                        }
                    ]
            })
        })
        vision = await response.json() 
        // console.log("vision", vision);


        if (vision.error?.message === "API key not valid. Please pass a valid API key.") {
            visionText =  "API key not valid. Please pass a valid API key."
        } else if (vision.error?.code === 429) {
            visionText =  "Defauil API key limits exhausted."
        } else if (vision.responses[0].fullTextAnnotation === undefined) {
            visionText =  "No text detected."
        } 
        // else if (vision.responses[0]?.textAnnotations[0]?.locale !== "ja" || vision.responses[0]?.textAnnotations[0]?.locale === "und") {
        //     visionText = "Japanese text not detected."
        // } // test hint ja
        else {
            visionText = await vision.responses[0].fullTextAnnotation.text.replaceAll("\n"," ")
        }
        // console.log("visionText", visionText);

        return [vision, visionText]

    } catch (error) {
        console.log(error)
        visionText =  "API key not valid. Please pass a valid API key."
        return visionText
    }
} // fetch vision

export async function AddAnkiCard(visionText, b64, translation, b64audio) {
    try {
    const translate = await fetch("http://localhost:8765", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
                    },
        body: JSON.stringify({
                "action": "addNote",
                "version": 6,
                "params": {
                    "note": {
                        "deckName": "Default",
                        "modelName": "Basic",
                        "fields": {
                            "Front": `Picture: <br>`,
                            "Back": `Text: ${visionText}, <br>
                            Translation: ${translation} <br>` 
                        },
                        "options": {
                            "allowDuplicate": false,
                            "duplicateScope": "deck",
                            "duplicateScopeOptions": {
                                "deckName": "Default",
                                "checkChildren": false,
                                "checkAllModels": false
                            }
                        },
                        "tags": [
                            "scanlingua"
                        ],
                        "audio": [{
                            "data": b64audio.audioContent,
                            "filename": "crop_audio.wav",
                            "fields": [
                                "Back"
                            ]
                        }],
                        "picture": [{
                            "data": b64,
                            "filename": "crop_pic.jpg",
                            "fields": [
                                "Front"
                            ]
                        }]
                    }
                }
          })
    })
    const response = await translate.json()
    // console.log("anki add card response", response);

    return response

    } catch (error) {
        console.log(error)
    }
} // add general anki card 

export async function AddKanjiCard(visionText, b64, translation, b64audio, kanjiData) {

    try {
    const translate = await fetch("http://localhost:8765", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
                    },
        body: JSON.stringify({
                "action": "addNote",
                "version": 6,
                "params": {
                    "note": {
                        "deckName": "Default",
                        "modelName": "Basic",
                        "fields": {
                            "Front": `Kanji: ${kanjiData.literal} <br>`,
                            "Back": `Kanji: ${kanjiData.literal} - ${kanjiData.meanings}, <br>
                            frequency: ${kanjiData.frequency}, grade: ${kanjiData.grade}, jlpt: ${kanjiData.jlpt}, <br>
                            onyomi: ${kanjiData.onyomi}, <br>
                            kunyomi: ${kanjiData.kunyomi}, <br>
                            example: ${visionText} - ${translation} <br>
                            `
                        },
                        "options": {
                            "allowDuplicate": false,
                            "duplicateScope": "deck",
                            "duplicateScopeOptions": {
                                "deckName": "Default",
                                "checkChildren": false,
                                "checkAllModels": false
                            }
                        },
                        "tags": [
                            "scanlingua"
                        ],
                        "audio": [{
                            "data": b64audio.audioContent,
                            "filename": "crop_audio.wav",
                            "fields": [
                                "Back"
                            ]
                        }],
                        "picture": [{
                            "data": b64,
                            "filename": "crop_pic.jpg",
                            "fields": [
                                "Front"
                            ]
                        }]
                    }
                }
          })
    })
    const response = await translate.json()
    // console.log("anki add card response", response);

    return response

    } catch (error) {
        console.log(error)
    }
} // add kanji anki card 
