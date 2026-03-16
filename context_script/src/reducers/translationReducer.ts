import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";

const initialState = ''

const translationSlice = createSlice({
    name: "translation",
    initialState,
    reducers: {
    setTranslation(state, action) {
        // console.log('translation action.payload', action.payload)
        if (action.payload === undefined) {
            return state
        }
        return state = action.payload
        },
    }
})

export const { setTranslation } = translationSlice.actions;

export const initializeTranslation = (translation: string) => {
    return async (dispatch: AppDispatch) => {
        // console.log('initial translation called with translation:', translation)
        dispatch(setTranslation(translation))
    }
}

export default translationSlice.reducer;