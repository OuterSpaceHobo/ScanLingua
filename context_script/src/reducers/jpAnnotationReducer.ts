import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const jpAnnotationSlice = createSlice({
    name: "jpAnnotation",
    initialState,
    reducers: {
        setJpAnnotation(state, action) {
        // console.log('JpAnnotation action.payload', action.payload)
        if (action.payload === undefined) {
            return state
        }
        return state = action.payload
        },
    }
})

export const { setJpAnnotation } = jpAnnotationSlice.actions;

export const initializeJpAnnotation = (jpAnnotation: any) => {
    return async (dispatch: (arg0: { payload: any; type: "jpAnnotation/setJpAnnotation"; }) => void) => {
        // console.log('initial jpAnnotation called with jpAnnotation:', jpAnnotation)
        dispatch(setJpAnnotation(jpAnnotation))
    }
}

export default jpAnnotationSlice.reducer;