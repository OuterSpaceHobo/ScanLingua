import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_LANGUAGE_CONFIG, STORAGE_KEY } from "../language";
import type { LanguageConfig } from "../language";
import type { AppDispatch } from "../store";

const languageSlice = createSlice({
    name: "language",
    initialState: DEFAULT_LANGUAGE_CONFIG,
    reducers: {
        setLanguage(state, action) {
            if (action.payload === undefined) {
                return state;
            }
            return action.payload;
        },
        setSourceLanguage(state, action) {
            state.source = action.payload;
        },
        setTargetLanguage(state, action) {
            state.target = action.payload;
        },
    },
});

export const { setLanguage, setSourceLanguage, setTargetLanguage } = languageSlice.actions;

export const saveLanguage = (config: LanguageConfig) => {
    return async (dispatch: AppDispatch) => {
        await chrome.storage.local.set({ [STORAGE_KEY]: config });
        dispatch(setLanguage(config));
        chrome.runtime?.sendMessage?.({ type: "analytics-event", name: "settings_changed", params: { setting_name: "language", new_value: `${config.source}->${config.target}` } })?.catch?.(() => {})
    };
};

export const initializeLanguage = () => {
    return async (dispatch: AppDispatch) => {
        const result = await chrome.storage.local.get([STORAGE_KEY]);
        dispatch(setLanguage(result[STORAGE_KEY]));
    };
};

export default languageSlice.reducer;
