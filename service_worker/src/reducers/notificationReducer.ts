import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return state = action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

let timeoutId: ReturnType<typeof setTimeout> | null = null;

export const createNotification = (message: string, delay: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setNotification(message));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => dispatch(setNotification(null)), delay * 1000);
  };
};

export default notificationSlice.reducer;