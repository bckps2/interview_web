import React from "react";
import { addInterView, GetAllInterViews } from "../../../Services/RequestService";
import { CompanyEmptyForm } from "./companyViewForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { Company } from "../../../Models/InterviewModel";
import { addNewCompany, AllInterviews } from "../../../redux/reducers/interviewSlice";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { CompanyCard } from "../../Cards/companyCard";

export function CompanyControl() {
    return <Companies />
}

function Companies() {

    const dispatch = useDispatch();
    const companySlice = useSelector((state: RootState) => state.companyInterview);

    function submitCompany(e: React.FormEvent<HTMLFormElement>) {
        addInterView(e)
            .then((res: Company) => {
                dispatch(addNewCompany(res));
            });
        hideModal(e,"NewCompanyModal");
    }

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
                <CompanyEmptyForm action={submitCompany}/>
                <CompanyCard companies={companySlice.companies} />
            </span>
        )
    }
}

function hideModal(e: React.FormEvent<HTMLFormElement>, nameModal : string) {
    var myModalAddProcess = document.getElementById(nameModal);
    if (myModalAddProcess) {
        document.getElementsByClassName('modal-backdrop')[0].remove();
        myModalAddProcess.hidden = true;
    }
}

