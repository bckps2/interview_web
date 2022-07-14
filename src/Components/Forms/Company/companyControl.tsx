import React from "react";
import { GetAllInterViews, submitInterviewSameCompany } from "../../../Services/RequestService";
import { CompanyEmptyForm } from "./companyViewForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { Company } from "../../../Models/InterviewModel";
import { AllInterviews } from "../../../redux/reducers/interviewSlice";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { CompanyCard } from "../../Cards/companyCard";

export function CompanyControl() {
    return <Companies />
}

function Companies() {

    const dispatch = useDispatch();
    const companySlice = useSelector((state: RootState) => state.companyInterview);

    useEffect(() => {
        GetAllInterViews().then((res: Company[]) => dispatch(AllInterviews(res)));
    }, [dispatch]);

    if (companySlice.companies?.map === undefined) {
        return (<div><p>Not Found interviews</p></div>)
    } else {
        return (
            <span>
                <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#NewCompanyModal"}>
                    Añade nueva entrevista con otra empresa
                </Button>
                <CompanyEmptyForm />
                <CompanyCard companies={companySlice.companies} />
            </span>
        )
    }
}

function hideModal(e: React.FormEvent<HTMLFormElement>) {
    var myModalNewCompany = document.getElementById("NewCompanyModal");
    if (myModalNewCompany) {
        document.getElementsByClassName('modal-backdrop')[0].remove();
        myModalNewCompany.hidden = true;
    }
}

