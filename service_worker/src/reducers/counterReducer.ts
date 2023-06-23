import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: 0,
    reducers: {
    setCounter(state, action) {
        // console.log('counter action.payload', action.payload)
        if (action.payload === undefined) {
            return state
        }
            return state = action.payload;
        },
    resetCounter(state, action) {
        // console.log('reset action.payload', action.payload)
            return state = action.payload;

        }
    }
})

export const { setCounter, resetCounter } = counterSlice.actions;

export const resetCount = () => {
    return async (dispatch) => {
        const apiCount = 0
        const zero = await chrome.storage.local.set({ "counter": apiCount })
        // console.log('zero', zero)
        dispatch(resetCounter(apiCount))
    }
}

export const initializeCount = () => {
    return async dispatch => {
        const StateCounter = await chrome.storage.local.get(["counter"])
        // console.log('StateCounter', StateCounter)
        dispatch(setCounter(StateCounter.counter))
    }
}

export default counterSlice.reducer;