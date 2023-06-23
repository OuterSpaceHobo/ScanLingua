import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const audioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
        setAudio(state, action) {
        // console.log('audio action.payload', action.payload)
        if (action.payload === undefined) {
            return state
        }
        return state = action.payload
        },
    }
})

export const { setAudio } = audioSlice.actions;

export const initializeAudio = (audio: any) => {
    return async (dispatch: (arg0: { payload: any; type: "audio/setAudio"; }) => void) => {
        // console.log('initial audio called with audio:', audio)
        dispatch(setAudio(audio))
    }
}

export default audioSlice.reducer;