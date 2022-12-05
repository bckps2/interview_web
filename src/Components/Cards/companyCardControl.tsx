import React from "react";
import { requestDelete, GetAll, requestAdd } from "../../Services/RequestService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Company } from "../../Models/InterviewModel";
import { AddNewCompany, AllCompanies, deleteCompany } from "../../redux/reducers/companySlice";
import { useEffect } from "react";
import { CompanyCard } from "./companyCard";
import { endpointsCompany } from "../../Models/Url";

export function CompanyCardControl() {
    return <Companies />
}

function Companies() {
    const dispatch = useDispatch();
    const companySlice = useSelector((state: RootState) => state.companySlice);

    useEffect(() => {
        if (!companySlice.companies.length) {
            GetAll(endpointsCompany.GetAllCompanies)
                .then((res: Company[]) => {
                    dispatch(AllCompanies(res))
                })
        }
    }, [dispatch,companySlice]);
    
    function deleteCompanyInterview(e: React.FormEvent<HTMLFormElement>, idCompany:number){
        requestDelete(e, endpointsCompany.DeleteCompany, idCompany)
            .then((res: Company) => {
                if(res){
                    dispatch(deleteCompany(res));
                }
            });
    }

    function submitCompany(e: React.FormEvent<HTMLFormElement>) {
        requestAdd(endpointsCompany.AddCompany, 'company', e)
            .then((res: Company) => {
                if (res) {
                    dispatch(AddNewCompany(res));
                }
            })
    }
    
    return (
        <CompanyCard addCompany={submitCompany} deleteCompany={deleteCompanyInterview} companies={companySlice?.companies} />
    )
}

