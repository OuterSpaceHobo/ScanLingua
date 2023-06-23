export{}

const idApp = "scrTr"
const idGhoustFrame = `${idApp}GhoustFrame`
const idTopFrame = `${idApp}TopFrame`
const idBottomFrame = `${idApp}BottomFrame`
const idLeftFrame = `${idApp}LeftFrame`
const idRightFrame = `${idApp}RightFrame`
const idZoneFrame = `${idApp}ZoneFrame`

let ghoustFrame: HTMLElement | null = null
let topFrame: HTMLElement | null = null
let bottomFrame: HTMLElement | null = null
let leftFrame: HTMLElement | null = null
let rightFrame: HTMLElement | null = null
let zoneFrame: HTMLElement | null = null

export { ghoustFrame, topFrame, bottomFrame, leftFrame, rightFrame, zoneFrame, idApp}

export function init() {
    
    ghoustFrame = document.getElementById(idGhoustFrame)
    if (!ghoustFrame) {
        ghoustFrame = document.createElement("div")
        ghoustFrame.id = idGhoustFrame
        ghoustFrame.style.cssText = "position: fixed; display: block; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0); z-index: calc(9e999);"
        document.body.appendChild(ghoustFrame)
    }

    topFrame = document.getElementById(idTopFrame)
    if (topFrame === null) {
        topFrame = document.createElement("div")
        topFrame.id = idTopFrame
        ghoustFrame.appendChild(topFrame); 
        topFrame.style.cssText = `background-color: rgba(0,0,0,0.5); z-index: calc(9e999);`
        topFrame.style.position = `absolute`
        topFrame.style.top = `0px`
    }

    bottomFrame = document.getElementById(idBottomFrame)
    if (bottomFrame === null) {
        bottomFrame = document.createElement("div")
        bottomFrame.id = idBottomFrame
        ghoustFrame.appendChild(bottomFrame); 
        bottomFrame.style.cssText = `background-color: rgba(0,0,0,0.5); z-index: calc(9e999);`
        bottomFrame.style.position = `absolute`
    }

    leftFrame = document.getElementById(idLeftFrame)
    if (leftFrame === null) {
        leftFrame = document.createElement("div")
        leftFrame.id = idLeftFrame
        ghoustFrame.appendChild(leftFrame); 
        leftFrame.style.cssText = `background-color: rgba(0,0,0,0.5); z-index: calc(9e999);`
        leftFrame.style.position = `absolute`
        leftFrame.style.height = `100%`
        leftFrame.style.top = `0px`
        leftFrame.style.left = `0px`
    }

    rightFrame = document.getElementById(idRightFrame)
    if (rightFrame === null) {
        rightFrame = document.createElement("div")
        rightFrame.id = idRightFrame
        ghoustFrame.appendChild(rightFrame); 
        rightFrame.style.cssText = `background-color: rgba(0,0,0,0.5); z-index: calc(9e999);`
        rightFrame.style.position = `absolute`
        rightFrame.style.height = `100%`
        rightFrame.style.top = `0px`
    }

    zoneFrame = document.getElementById(idZoneFrame)
    if (zoneFrame === null) {
        zoneFrame = document.createElement("div")
        zoneFrame.id = idZoneFrame
        ghoustFrame.appendChild(zoneFrame); 
        zoneFrame.style.cssText = `background-color: rgba(0,0,0,0); z-index: calc(9e999);`
        zoneFrame.style.position = `relative`
        zoneFrame.style.display = `block`
        zoneFrame.style.borderStyle = `dashed`
        zoneFrame.style.borderWidth = `1px`
        zoneFrame.style.borderColor = `black`
    }
    hideOverlay()
    hideZone()
}

export function showOverlay () {
    topFrame!.style.display = `block`
    leftFrame!.style.display = `block`
    bottomFrame!.style.display = `block`
    rightFrame!.style.display = `block`
}

export function hideOverlay () {
    topFrame!.style.display = `none`
    leftFrame!.style.display = `none`
    bottomFrame!.style.display = `none`
    rightFrame!.style.display = `none`
}

export function showZone () {
    zoneFrame!.style.display = `block`
}

export function hideZone () {
    zoneFrame!.style.display = `none`
}

export function fancyCursor() {
    document.getElementById(idGhoustFrame)!.style.cursor = "crosshair";
}

export function autoCursor() {
    document.getElementById(idGhoustFrame)!.style.cursor = "auto";
}

export function deInit() {
    ghoustFrame?.parentNode!.removeChild(ghoustFrame!); ghoustFrame = null
    topFrame?.parentNode!.removeChild(topFrame!); topFrame = null
    bottomFrame?.parentNode!.removeChild(bottomFrame!); bottomFrame = null
    leftFrame?.parentNode!.removeChild(leftFrame!); leftFrame = null
    rightFrame?.parentNode!.removeChild(rightFrame!); rightFrame = null
    zoneFrame?.parentNode!.removeChild(zoneFrame!); zoneFrame = null
    document.body.style.overflow = "auto";
}
