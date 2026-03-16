import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../store";

const STORAGE_KEY = "ankiDeck";

const ankiSlice = createSlice({
    name: "anki",
    initialState: {
        isConnected: false,
        decks: [] as string[],
        selectedDeck: "Default",
    },
    reducers: {
        setAnkiState(state, action) {
            state.isConnected = action.payload.isConnected;
            state.decks = action.payload.decks;
        },
        setSelectedDeck(state, action) {
            state.selectedDeck = action.payload;
        },
    },
});

export const { setAnkiState, setSelectedDeck } = ankiSlice.actions;

export const initializeAnki = () => {
    return async (dispatch: AppDispatch) => {
        const result = await chrome.storage.local.get([STORAGE_KEY]);
        if (result[STORAGE_KEY]) {
            dispatch(setSelectedDeck(result[STORAGE_KEY]));
        }
    };
};

export const saveAnkiDeck = (deckName: string) => {
    return async (dispatch: AppDispatch) => {
        await chrome.storage.local.set({ [STORAGE_KEY]: deckName });
        dispatch(setSelectedDeck(deckName));
        chrome.runtime?.sendMessage?.({ type: "analytics-event", name: "settings_changed", params: { setting_name: "anki_deck", new_value: deckName } })
    };
};

export const pollAnkiConnection = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const resp = await fetch("http://localhost:8765", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "deckNames", version: 6 }),
            });
            const data = await resp.json();
            const decks = data.result || [];
            dispatch(setAnkiState({ isConnected: true, decks }));

            const { selectedDeck } = getState().anki;
            if (decks.length > 0 && !decks.includes(selectedDeck)) {
                const fallback = decks.includes("Default") ? "Default" : decks[0];
                dispatch(saveAnkiDeck(fallback));
            }
        } catch {
            dispatch(setAnkiState({ isConnected: false, decks: [] }));
        }
    };
};

export default ankiSlice.reducer;
