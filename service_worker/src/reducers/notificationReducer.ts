import { createSlice } from "@reduxjs/toolkit";

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

let timeoutId: NodeJS.Timeout | number | null = null;

export const createNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch(setNotification(message));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => dispatch(setNotification(null)), delay * 1000);
  };
};

export default notificationSlice.reducer;