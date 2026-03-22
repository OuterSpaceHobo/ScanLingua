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

export async function AddAnkiCard(visionText, b64, translation, deckName = "Default", labels = {}) {
    try {
    const lPicture = labels.picture || 'Picture:'
    const lText = labels.text || 'Text:'
    const lTranslation = labels.translation || 'Translation:'
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)
    const translate = await fetch("http://localhost:8765", {
        signal: controller.signal,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
                    },
        body: JSON.stringify({
                "action": "addNote",
                "version": 6,
                "params": {
                    "note": {
                        "deckName": deckName,
                        "modelName": "Basic",
                        "fields": {
                            "Front": `${lPicture} <br>`,
                            "Back": `${lText} ${visionText}, <br>
                            ${lTranslation} ${translation} <br>`
                        },
                        "options": {
                            "allowDuplicate": false,
                            "duplicateScope": "deck",
                            "duplicateScopeOptions": {
                                "deckName": deckName,
                                "checkChildren": false,
                                "checkAllModels": false
                            }
                        },
                        "tags": [
                            "scanlingua"
                        ],
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
    clearTimeout(timeoutId)
    const response = await translate.json()
    // console.log("anki add card response", response);

    return response

    } catch (error) {
        console.log(error)
        return { error: 'notification.ankiNotRunning' }
    }
} // add general anki card

function buildCardBack(d, visionText, translation, labels = {}) {
    let back = `${d.literal} - ${d.meanings} <br>`
    if (d.frequency !== undefined) back += `${labels.frequency || 'frequency: '}${d.frequency}, ${labels.grade || 'grade: '}${d.grade}, ${labels.jlpt || 'jlpt: '}${d.jlpt} <br>`
    if (d.onyomi !== undefined) back += `${labels.on || 'onyomi: '}${d.onyomi} <br>`
    if (d.kunyomi !== undefined) back += `${labels.kun || 'kunyomi: '}${d.kunyomi} <br>`
    if (d.pinyin !== undefined) back += `${labels.pinyin || 'pinyin: '}${d.pinyin} <br>`
    if (d.traditional !== undefined) back += `${labels.traditional || 'traditional: '}${d.traditional} <br>`
    if (d.simplified !== undefined) back += `${labels.simplified || 'simplified: '}${d.simplified} <br>`
    if (d.romaja !== undefined) back += `${labels.romaja || 'romaja: '}${d.romaja} <br>`
    if (d.readings !== undefined) back += `${labels.readings || 'readings: '}${d.readings} <br>`
    if (d.pos !== undefined) back += `${labels.pos || 'pos: '}${d.pos} <br>`
    back += `${labels.example || 'example: '}${visionText} - ${translation} <br>`
    return back
}

export async function AddKanjiCard(visionText, b64, translation, kanjiData, deckName = "Default", labels = {}) {

    try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)
    const translate = await fetch("http://localhost:8765", {
        signal: controller.signal,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
                    },
        body: JSON.stringify({
                "action": "addNote",
                "version": 6,
                "params": {
                    "note": {
                        "deckName": deckName,
                        "modelName": "Basic",
                        "fields": {
                            "Front": `${kanjiData.literal} <br>`,
                            "Back": buildCardBack(kanjiData, visionText, translation, labels)
                        },
                        "options": {
                            "allowDuplicate": false,
                            "duplicateScope": "deck",
                            "duplicateScopeOptions": {
                                "deckName": deckName,
                                "checkChildren": false,
                                "checkAllModels": false
                            }
                        },
                        "tags": [
                            "scanlingua"
                        ],
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
    clearTimeout(timeoutId)
    const response = await translate.json()
    // console.log("anki add card response", response);

    return response

    } catch (error) {
        console.log(error)
        return { error: 'notification.ankiNotRunning' }
    }
} // add kanji anki card