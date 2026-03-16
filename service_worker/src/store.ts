import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import languageReducer from "./reducers/languageReducer";
import ankiReducer from "./reducers/ankiReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    language: languageReducer,
    anki: ankiReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch