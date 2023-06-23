import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const visionSlice = createSlice({
    name: "vision",
    initialState,
    reducers: {
    setVision(state, action) {
        // console.log('vision action.payload', action.payload)
        if (action.payload === undefined) {
            return state
        }
        return state = action.payload
        },
    }
})

export const { setVision } = visionSlice.actions;

export const initializeVision = (vision: any) => {
    return async (dispatch: (arg0: { payload: any; type: "vision/setVision"; }) => void) => {
        // console.log('initial vision called with vision:', vision)
        dispatch(setVision(vision))
    }
}

export default visionSlice.reducer;