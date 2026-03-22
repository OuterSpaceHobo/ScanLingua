const RESULT_WIDTH = 415
const RESULT_HEIGHT = 250
const GAP = 10

export { RESULT_WIDTH, RESULT_HEIGHT, GAP }

export function calcPosition(tabHeight: number, rightSpace: number, leftSpace: number, topSpace: number, bottomSpace: number) {
    if (rightSpace >= RESULT_WIDTH) {
        const maxTop = tabHeight - topSpace - RESULT_HEIGHT
        const clampedTop = Math.max(-topSpace, Math.min(-1, maxTop))
        return { left: `calc(100% + ${GAP}px)`, top: `${clampedTop}px` }
    } else if (leftSpace >= RESULT_WIDTH) {
        const maxTop = tabHeight - topSpace - RESULT_HEIGHT
        const clampedTop = Math.max(-topSpace, Math.min(-1, maxTop))
        return { left: `-${RESULT_WIDTH}px`, top: `${clampedTop}px` }
    } else if (bottomSpace >= RESULT_HEIGHT) {
        return { left: `-1px`, top: `calc(100% + ${GAP}px)` }
    } else {
        if (topSpace >= RESULT_HEIGHT) {
            return { left: `-1px`, bottom: `calc(100% + ${GAP}px)`, top: `unset` }
        } else {
            return { left: `-1px`, top: `${-topSpace}px` }
        }
    }
}
