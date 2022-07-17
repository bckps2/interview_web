import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company, InformationInterview, Interview } from "../../Models/InterviewModel";

interface interviewState{
    companies : Company[],
    interview: Interview,
    company:Company
}

const initialState: interviewState = {
    companies: {} as Company[],
    interview: {} as Interview,
    company: {} as Company
}

const companyInterviewSlice = createSlice({
    name:'interviews',
    initialState,
    reducers: {
        addNewCompany:(state, action: PayloadAction<Company>) => {
            state.companies.push(action.payload);
        },
        AllInterviews:(state, action: PayloadAction<Company[]>) => {
            state.companies = action.payload;
        },
        AddInterView:(state, action:PayloadAction<Interview>) => {  
            state.company.interViews.push(action.payload);      
        },
        setStateInformation:(state, action: PayloadAction<InformationInterview>)=>{
            state.company.interViews.find((interview) => {
                return interview.idInterView === action.payload.interViewIdInterView
            })?.informationInterViews.push(action.payload);
        },
        setStateCompany:(state, action:PayloadAction<Company>) => {
            state.company = action.payload;
        }
    }
})

export const { AllInterviews, AddInterView, setStateCompany,setStateInformation,addNewCompany } = companyInterviewSlice.actions

export default companyInterviewSlice.reducer