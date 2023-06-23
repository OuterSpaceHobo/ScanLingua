import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    x1: 0,
    y1: 0, 
    x2: 0, 
    y2: 0, 
}

const coordsSlice = createSlice({
    name: "coords",
    initialState,
    reducers: {
    setCoords(state, action) {
        // console.log('coords action.payload', action.payload)
        if (action.payload === undefined) {
            return state
        }
        return {
            ...state, 
            x1: action.payload.x1,
            y1: action.payload.y1,
            x2: action.payload.x2,
            y2: action.payload.y2,
        }
        },
    }
})

export const { setCoords } = coordsSlice.actions;

export const initializeCoords = (coords: { x1: number; y1: number; x2: number; y2: number; }) => {
    return async (dispatch: (arg0: { payload: any; type: "coords/setCoords"; }) => void) => {
        // console.log('initial coords called with coords:', coords)
        dispatch(setCoords(coords))
    }
}

export default coordsSlice.reducer;