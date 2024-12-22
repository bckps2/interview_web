import { configureStore } from "@reduxjs/toolkit";
import InterviewSlice from "../Reducers/InterviewSlice";
import ProcessSlice from "../Reducers/ProcessSlice";
import CompanySlice from "../Reducers/CompanySlice";

export const store = configureStore({
    reducer:{
        interviewSlice: InterviewSlice,
        processInterview: ProcessSlice,
        companySlice: CompanySlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;