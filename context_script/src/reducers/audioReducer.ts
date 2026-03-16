import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    voiceAvailable: false,
    visionText: "",
}

const audioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
        setVoiceAvailable(state, action) {
            state.voiceAvailable = action.payload
        },
        setVisionTextForTTS(state, action) {
            state.visionText = action.payload
        },
    }
})

export const { setVoiceAvailable, setVisionTextForTTS } = audioSlice.actions;

export default audioSlice.reducer;
