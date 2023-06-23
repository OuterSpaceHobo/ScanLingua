import { configureStore } from "@reduxjs/toolkit";
import keyReducer from './reducers/apiKeyReducer'
import counterReducer from "./reducers/counterReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    key: keyReducer,
    notification: notificationReducer,
    counter: counterReducer
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch