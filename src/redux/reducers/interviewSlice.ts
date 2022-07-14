import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company, Interview } from "../../Models/InterviewModel";

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
        AllInterviews:(state, action: PayloadAction<Company[]>) => {
            state.companies = action.payload;
        },
        AddInterView:(state, action:PayloadAction<Interview>) => {  
            state.company?.interViews?.push(action.payload);
            // state.companies.forEach((company) => {
            //     if(company.idCompany === action.payload.companyIdCompany){
            //         company?.interViews.push(action.payload);
            //         state.company = company;
            //     }
            // })        
        },
        setStateCompany:(state, action:PayloadAction<Company>) => {
            state.company = action.payload;
        }
    }
})

export const { AllInterviews, AddInterView, setStateCompany } = companyInterviewSlice.actions

export default companyInterviewSlice.reducer