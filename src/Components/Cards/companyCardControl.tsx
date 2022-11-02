import React from "react";
import { addCompany, GetAllICompanies } from "../../Services/RequestService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Company } from "../../Models/InterviewModel";
import { addNewCompany, AllCompanies } from "../../redux/reducers/companySlice";
import { useEffect } from "react";
import { CompanyCard } from "./companyCard";
import { hideModal } from "../../Utils/utilsModal";

export function CompanyCardControl() {
    return <Companies />
}

function Companies() {
    const dispatch = useDispatch();
    const companySlice = useSelector((state: RootState) => state.companySlice);

    function submitCompany(e: React.FormEvent<HTMLFormElement>) {
        addCompany(e)
            .then((res: Company) => {
                dispatch(addNewCompany(res));
            });
        hideModal("NewCompanyModal");
    }

    useEffect(() => {
        if (!companySlice.companies.length) {
            GetAllICompanies()
                .then((res: Company[]) => {
                    dispatch(AllCompanies(res))
                })
        }
    }, [dispatch,companySlice]);

    // function DeleteInterView(event: any, idCompany: number) {
    //     deleteCompanyDb(event, idCompany).then((response) => {
    //         if (response.idCompany) {
    //             let companySession = sessionStorage.getItem('companies');
    //             if (companySession) {
    //                 let companies = JSON.parse(companySession) as Company[];
    //                 companies = companies.filter((company) => company.idCompany !== response.idCompany);
    //                 sessionStorage.setItem('companies', JSON.stringify(companies));
    //                 dispatch(deleteCompanyDb(event, idCompany));
    //             }
    //         }
    //     })
    // }

    return (
        <CompanyCard deleteCompany={null} companies={companySlice?.companies} submit={submitCompany} />
    )
}

