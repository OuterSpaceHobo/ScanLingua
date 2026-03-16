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

export async function AddAnkiCard(visionText, b64, translation, deckName = "Default") {
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
                        "deckName": deckName,
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
    const response = await translate.json()
    // console.log("anki add card response", response);

    return response

    } catch (error) {
        console.log(error)
        return { error: 'Anki is not running. Launch Anki and try again.' }
    }
} // add general anki card

function buildCardBack(d, visionText, translation) {
    let back = `${d.literal} - ${d.meanings} <br>`
    if (d.frequency !== undefined) back += `frequency: ${d.frequency}, grade: ${d.grade}, jlpt: ${d.jlpt} <br>`
    if (d.onyomi !== undefined) back += `onyomi: ${d.onyomi} <br>`
    if (d.kunyomi !== undefined) back += `kunyomi: ${d.kunyomi} <br>`
    if (d.pinyin !== undefined) back += `pinyin: ${d.pinyin} <br>`
    if (d.traditional !== undefined) back += `traditional: ${d.traditional} <br>`
    if (d.simplified !== undefined) back += `simplified: ${d.simplified} <br>`
    if (d.romaja !== undefined) back += `romaja: ${d.romaja} <br>`
    if (d.readings !== undefined) back += `readings: ${d.readings} <br>`
    if (d.pos !== undefined) back += `pos: ${d.pos} <br>`
    back += `example: ${visionText} - ${translation} <br>`
    return back
}

export async function AddKanjiCard(visionText, b64, translation, kanjiData, deckName = "Default") {

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
                        "deckName": deckName,
                        "modelName": "Basic",
                        "fields": {
                            "Front": `${kanjiData.literal} <br>`,
                            "Back": buildCardBack(kanjiData, visionText, translation)
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
    const response = await translate.json()
    // console.log("anki add card response", response);

    return response

    } catch (error) {
        console.log(error)
        return { error: 'Anki is not running. Launch Anki and try again.' }
    }
} // add kanji anki card