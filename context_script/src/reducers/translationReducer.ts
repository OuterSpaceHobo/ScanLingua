import { createSlice } from "@reduxjs/toolkit";

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

export const initializeTranslation = (translation: any) => {
    return async (dispatch: (arg0: { payload: any; type: "translation/setTranslation"; }) => void) => {
        // console.log('initial translation called with translation:', translation)
        dispatch(setTranslation(translation))
    }
}

export default translationSlice.reducer;