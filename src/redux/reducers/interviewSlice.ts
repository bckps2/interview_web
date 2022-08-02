import { bindActionCreators, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company, InformationInterview, Interview } from "../../Models/InterviewModel";

interface interviewState {
    companies: Company[],
    interview: Interview,
    company: Company
}

const initialState: interviewState = {
    companies: {} as Company[],
    interview: {} as Interview,
    company: {} as Company
}

const companyInterviewSlice = createSlice({
    name: 'interviews',
    initialState,
    reducers: {
        addNewCompany: (state, action: PayloadAction<Company>) => {
            state.companies.push(action.payload);
        },
        AllInterviews: (state, action: PayloadAction<Company[]>) => {
            state.companies = action.payload;
        },
        // AddInterView: (state, action: PayloadAction<Interview>) => {
        //     state.company.interViews.push(action.payload);
        // },
        // setStateInformation: (state, action: PayloadAction<InformationInterview>) => {
        //     state.company.interViews.find((interview) => {
        //         return interview.idInterView === action.payload.interViewIdInterView
        //     })?.informationInterViews.push(action.payload);
        // },
        // setupdateInformation: (state, action: PayloadAction<InformationInterview>) => {
        //     state.company.interViews.forEach((interview) => {
        //         if (interview.idInterView === action.payload.interViewIdInterView) {
        //             interview.informationInterViews.forEach((information) => {
        //                 if (information.idInformation === action.payload.idInformation) {
        //                     information = action.payload
        //                 }
        //             })
        //         }
        //     })
        // },
        setStateCompany: (state, action: PayloadAction<Company>) => {
            state.company = action.payload;
        },
        // deleteInformation: (state, action: PayloadAction<InformationInterview>) => {
        //     let filteredInformation = state.company.interViews
        //         .find((interview) => { return interview.idInterView === action.payload.interViewIdInterView })
        //         ?.informationInterViews.filter((information) => { return information.idInformation !== action.payload.idInformation })

        //     state.company.interViews.forEach((interview) => {
        //         if (interview.idInterView === action.payload.interViewIdInterView) {
        //             interview.informationInterViews = filteredInformation as InformationInterview[];
        //         }
        //     })
        // },
        // deleteInterview: (state, action: PayloadAction<Interview>) => {
        //     state.company.interViews = state.company.interViews.filter((interview) => { return interview.idInterView !== action.payload.idInterView }) as Interview[];;
        // },
        // deleteCompany: (state, action: PayloadAction<Company>) => {
        //     state.companies = state.companies.filter((company) => company.idCompany !== action.payload.idCompany);
        // }
    }
})

// export const { AllInterviews, AddInterView, setStateCompany, setStateInformation, addNewCompany, deleteInformation, deleteInterview, setupdateInformation, deleteCompany } = companyInterviewSlice.actions
export const { AllInterviews, addNewCompany, setStateCompany } = companyInterviewSlice.actions
export default companyInterviewSlice.reducer