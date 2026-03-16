import {ghoustFrame, topFrame, zoneFrame, bottomFrame, leftFrame, rightFrame} from "./init"

export function renderOverlay (x1: number, y1: number, x2: number, y2: number) {
    
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

    const rect = ghoustFrame!.getBoundingClientRect()
    const zoneHetght = y2 - y1
    const zoneWidth = x2 - x1

    topFrame!.style.height = `${y1}px`
    topFrame!.style.left = `${x1}px`
    topFrame!.style.width = `${zoneWidth}px`

    zoneFrame!.style.top = `${y1}px`
    zoneFrame!.style.height = `${zoneHetght}px`
    zoneFrame!.style.left = `${x1}px`
    zoneFrame!.style.width = `${zoneWidth}px`

    bottomFrame!.style.top = `${y1 + zoneHetght}px`
    bottomFrame!.style.height = `${rect.height - (y1 + zoneHetght)}px`
    bottomFrame!.style.left = `${x1}px`
    bottomFrame!.style.width = `${zoneWidth}px`

    leftFrame!.style.width = `${x1}px`

    rightFrame!.style.width = `${rect.width - (x1 + zoneWidth)}px`
    rightFrame!.style.left = `${x1 + zoneWidth}px`     
}