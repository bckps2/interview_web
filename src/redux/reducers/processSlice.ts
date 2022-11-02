import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Interview, Process } from "../../Models/InterviewModel";

interface interviewState {
    process: Process,
    processes:Process[]
}

const initialState: interviewState = {
    process: {} as Process,
    processes: {} as Process[]
}

const processSlice = createSlice({

    name: 'process',
    initialState,
    reducers: {
        addProcessState: (state, action: PayloadAction<Process>) => {
            state.processes.push(action.payload);
        },
        processState: (state, action:PayloadAction<Process>) => {
            state.process = action.payload;
        },
        processesState: (state, action:PayloadAction<Process[]>) => {
            state.processes = action.payload;
        },
        addInterviewInProcess:(state, action:PayloadAction<Interview>)=>{
            state.processes.forEach(c => {
                if(c.idProcess == action.payload.idProcess){
                    c.interviews.push(action.payload);
                }
            })
        }
    }
});

export const { addProcessState, processState,processesState,addInterviewInProcess } = processSlice.actions;
export default processSlice.reducer;