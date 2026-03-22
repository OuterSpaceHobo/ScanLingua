import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";

interface CharData {
  literal: string
  meanings: string[]
  readings?: string[]
  frequency?: number
  grade?: number
  jlpt?: number
  onyomi?: string[]
  kunyomi?: string[]
  pinyin?: string
  traditional?: string
  simplified?: string
  romaja?: string
  pos?: string
}

interface AnnotationState {
  lang: string
  kanji: CharData[]
}

const initialState: AnnotationState | Record<string, never> = {}

const annotationSlice = createSlice({
    name: "annotation",
    initialState: initialState as AnnotationState | string | Record<string, never>,
    reducers: {
        setAnnotation(_state, action) {
        if (action.payload === undefined) {
            return _state
        }
        return action.payload
        },
    }
})

export const { setAnnotation } = annotationSlice.actions;

export const initializeAnnotation = (annotation: AnnotationState | string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setAnnotation(annotation))
    }
}

export default annotationSlice.reducer;
export type { CharData, AnnotationState }
