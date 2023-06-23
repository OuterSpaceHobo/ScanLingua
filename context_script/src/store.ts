import { configureStore } from "@reduxjs/toolkit";
import coordsReducer from "./reducers/coordsReducer";
import visionReducer from "./reducers/visionReducer";
import translationReducer from "./reducers/translationReducer";
import jpAnnotationReducer from "./reducers/jpAnnotationReducer";
import audioReducer from "./reducers/audioReducer";
import notificationReducer from "./reducers/notificationReducer";


const store = configureStore({
  reducer: {
    coords: coordsReducer,
    vision: visionReducer,
    translation: translationReducer,
    jpAnnotation: jpAnnotationReducer,
    audio: audioReducer,
    notification: notificationReducer,
  },
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch