import { createSlice } from "@reduxjs/toolkit";
import i18next from "i18next";
import type { AppDispatch } from "../store";

const STORAGE_KEY = "uiLocale";

const localeSlice = createSlice({
    name: "locale",
    initialState: {
        uiLocale: "en",
    },
    reducers: {
        setLocale(state, action) {
            state.uiLocale = action.payload;
        },
    },
});

export const { setLocale } = localeSlice.actions;

export const saveLocale = (code: string) => {
    return async (dispatch: AppDispatch) => {
        console.log('[i18n] saveLocale →', code);
        await chrome.storage.local.set({ [STORAGE_KEY]: code });
        dispatch(setLocale(code));
        i18next.changeLanguage(code);
    };
};

export const initializeLocale = () => {
    return async (dispatch: AppDispatch) => {
        const result = await chrome.storage.local.get([STORAGE_KEY]);
        let code = result[STORAGE_KEY] || 'en';
        if (code === 'zh') code = 'zh_CN';
        if (code === 'pt') code = 'pt_BR';
        console.log('[i18n] initializeLocale →', result[STORAGE_KEY] ? code : 'en (default)');
        dispatch(setLocale(code));
        if (code !== i18next.language) {
            i18next.changeLanguage(code);
        }
    };
};

export default localeSlice.reducer;
