import { createSlice } from "@reduxjs/toolkit";

const keySlice = createSlice({
    name: "key",
    initialState: '',
    reducers: {
    setApiKey(state, action) {
        // console.log('setApiKey action.payload', action.payload)
        if (action.payload === undefined) {
            return state
        }
            return state = action.payload;
        },
    },
});

export const { setApiKey } = keySlice.actions;

export const rememberUserKey = (userApi) => {
    chrome.storage.local.set({ "setApi": userApi })
    // console.log('userApi', userApi)
    return async (dispatch) => {
        dispatch(setApiKey(userApi))
    }
}

export const initializeKey = () => {
    return async dispatch => {
        const StateKey = await chrome.storage.local.get(["setApi"])
        // console.log('StateKey', StateKey)
        dispatch(setApiKey(StateKey.setApi))
    }
}

export default keySlice.reducer;