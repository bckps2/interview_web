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
        deleteProcessState: (state, action: PayloadAction<Process>) => {
            state.processes = state.processes.filter(obj => {return obj.idProcess !== action.payload.idProcess} );
        },
        deleteInterviewState: (state, action: PayloadAction<Interview>) => {
            state.processes.forEach(element => {
                element.interviews = element.interviews.filter(obj => {return obj.idInterview !== action.payload.idInterview} );
            });
        },
        addInterviewInProcess:(state, action:PayloadAction<Interview>)=>{
            state.processes.forEach(c => {
                if(c.idProcess === action.payload.idProcess){
                    if(c.interviews === null){
                        c.interviews = [];
                    }

                    c.interviews.push(action.payload);
                }
            })
        },
        updateStateInterview:(state, action:PayloadAction<Interview>)=>{
            state.processes.forEach(c => {
                if(c.idProcess === action.payload.idProcess){
                    c.interviews.forEach(interview => {
                        if(interview.idInterview === action.payload.idInterview){
                            interview = action.payload;
                        }
                    });
                }
            })
        }
    }
});

export const { addProcessState, processState,processesState,addInterviewInProcess,deleteInterviewState,updateStateInterview,deleteProcessState } = processSlice.actions;
export default processSlice.reducer;