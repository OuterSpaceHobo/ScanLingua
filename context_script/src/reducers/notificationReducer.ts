import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";

interface NotificationState {
  message: string
  id: number
}

const notificationSlice = createSlice({
  name: "notification",
  initialState: null as NotificationState | null,
  reducers: {
    setNotification(_state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

let timeoutId: ReturnType<typeof setTimeout> | null = null;
let notifId = 0;

export const createNotification = (message: string, delay: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setNotification({ message, id: ++notifId }));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => dispatch(setNotification(null)), delay * 1000);
  };
};

export default notificationSlice.reducer;
