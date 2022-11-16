import { configureStore } from "@reduxjs/toolkit";
import companySlice from "../reducers/companySlice";
import interviewSlice from "../reducers/interviewSlice";
import processSlice from "../reducers/processSlice";

export const store = configureStore({
    reducer:{
        interviewSlice: interviewSlice,
        processInterview: processSlice,
        companySlice: companySlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;