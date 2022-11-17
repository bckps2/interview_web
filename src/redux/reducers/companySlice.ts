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
        AddNewCompany: (state, action: PayloadAction<Company>) => {
            state.companies.push(action.payload);
        },
        AllCompanies: (state, action: PayloadAction<Company[]>) => {
            state.companies = action.payload;
        },
        FindingCompany: (state, action: PayloadAction<number>) => {
            state.companies.forEach(company => {
                if (company.idCompany === action.payload) {
                    state.company = company;
                }
            });
        },
        DeleteInterviewState: (state, action: PayloadAction<Company>) => {
            state.companies = state.companies.filter((company) => { return company.idCompany !== action.payload.idCompany }) as Company[];
        }
    }
});

export const { AllCompanies, AddNewCompany, FindingCompany, DeleteInterviewState } = companySlice.actions;
export default companySlice.reducer;