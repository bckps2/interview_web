import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company } from "../../Models/InterviewModel"

interface companyState {
    company: Company,
    companies: Company[],
}

const initialState: companyState = {
    company: {} as Company,
    companies: {} as Company[]
}

const companySlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        addNewCompany:(state, action: PayloadAction<Company>)=>{
            state.companies.push(action.payload);
        },
        setStateCompany: (state, action: PayloadAction<Company>) => {
        state.company = action.payload;
        },
        AllCompanies:(state, action:PayloadAction<Company[]>) => {
            state.companies = action.payload;
        },
        FindingCompany:(state, action:PayloadAction<number>) => {
            state.companies.forEach(company => {
                if(company.idCompany === action.payload){
                    state.company = company;
                }
            });
        }
    }
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
});

export const { setStateCompany, AllCompanies,addNewCompany,FindingCompany } = companySlice.actions;
export default companySlice.reducer;