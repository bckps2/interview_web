import { configureStore } from "@reduxjs/toolkit";
import companyInterviewSlice from "../reducers/interviewSlice";

export const store = configureStore({
    reducer:{
        companyInterview: companyInterviewSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;