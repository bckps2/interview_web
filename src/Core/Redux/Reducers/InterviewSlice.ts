import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Interview } from "../../../Models/InterviewModel";

interface interviewState {
    interview: Interview,
    interviews: Interview[],
}

const initialState: interviewState = {
    interview: {} as Interview,
    interviews: {} as Interview[]
}

const InterviewSlice = createSlice({
    name: 'interviews',
    initialState,
    reducers: {
        addNewInterview: (state, action: PayloadAction<Interview>) => {
            state.interviews.push(action.payload);
        },
        AllInterviews: (state, action: PayloadAction<Interview[]>) => {
            state.interviews = action.payload;
        }
    }
})

export const { AllInterviews, addNewInterview } = InterviewSlice.actions
export default InterviewSlice.reducer