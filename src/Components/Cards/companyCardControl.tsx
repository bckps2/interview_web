import React from "react";
import { addCompany, deleteCompany, GetAllICompanies } from "../../Services/RequestService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Company } from "../../Models/InterviewModel";
import { AddNewCompany, AllCompanies, DeleteInterviewState } from "../../redux/reducers/companySlice";
import { useEffect } from "react";
import { CompanyCard } from "./companyCard";
import { hideModal } from "../../Utils/utilsModal";

export function CompanyCardControl() {
    return <Companies />
}

function Companies() {
    const dispatch = useDispatch();
    const companySlice = useSelector((state: RootState) => state.companySlice);

    useEffect(() => {
        if (!companySlice.companies.length) {
            GetAllICompanies()
                .then((res: Company[]) => {
                    dispatch(AllCompanies(res))
                })
        }
    }, [dispatch,companySlice]);

    function submitCompany(e: React.FormEvent<HTMLFormElement>) {
        addCompany(e)
            .then((res: Company) => {
                dispatch(AddNewCompany(res));
                hideModal("NewCompanyModal");
            });
    }

    function deleteCompanyInterview(e: React.FormEvent<HTMLFormElement>, idCompany:number){
        deleteCompany(e, idCompany)
            .then((res: Company) => {
                dispatch(DeleteInterviewState(res));
            });
    }

    return (
        <CompanyCard deleteCompany={deleteCompanyInterview} companies={companySlice?.companies} submit={submitCompany} />
    )
}

