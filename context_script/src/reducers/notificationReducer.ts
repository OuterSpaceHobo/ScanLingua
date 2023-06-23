import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

let timeoutId: any = null;

export const createNotification = (message: string, delay: number) => {
  return async (dispatch: (arg0: { payload: any; type: "notification/setNotification"; }) => void) => {
    dispatch(setNotification(message));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => dispatch(setNotification(null)), delay * 1000);
  };
};

export default notificationSlice.reducer;