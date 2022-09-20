import React from "react";
import { addCompany, deleteCompanyDb, GetAllICompanies } from "../../Services/RequestService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Company } from "../../Models/InterviewModel";
import { addNewCompany, AllInterviews } from "../../redux/reducers/interviewSlice";
import { useEffect } from "react";
import { CompanyCard } from "./companyCard";
import { hideModal } from "../../Utils/utilsModal";

export function CompanyCardControl() {
    return <Companies />
}

function Companies() {

    let canLoadInterviews = true;
    var load = sessionStorage.getItem('canLoadInterviews');

    if (load !== null) {
        canLoadInterviews = load.toLowerCase() === 'true';
    }

    const dispatch = useDispatch();
    const companySlice = useSelector((state: RootState) => state.companyInterview);

    function submitCompany(e: React.FormEvent<HTMLFormElement>) {
        addCompany(e)
            .then((res: Company) => {
                dispatch(addNewCompany(res));
                var companiesStorage = sessionStorage.getItem('companies');
                if (companiesStorage) {
                    var companies = JSON.parse(companiesStorage) as Company[];
                    companies.push(res);
                    sessionStorage.setItem('companies', JSON.stringify(companies));
                }
            });
        hideModal("NewCompanyModal");
    }

    useEffect(() => {
        if (canLoadInterviews) {
            GetAllICompanies()
                .then((res: Company[]) => {
                    dispatch(AllInterviews(res))
                    sessionStorage.setItem('companies', JSON.stringify(res));
                    sessionStorage.setItem('canLoadInterviews', JSON.stringify(false));
                })
        } else {
            var companiesStorage = sessionStorage.getItem('companies');
            if (companiesStorage) {
                var companies = JSON.parse(companiesStorage) as Company[];
                dispatch(AllInterviews(companies))
            }
        }
    }, [dispatch, canLoadInterviews]);

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

