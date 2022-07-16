import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Company, InformationInterview, Interview } from "../../Models/InterviewModel";
import { AddInterView, setStateCompany, setStateInformation } from "../../redux/reducers/interviewSlice";
import { RootState } from "../../redux/store/store";
import { submitAddInformation, submitInterviewSameCompany } from "../../Services/RequestService";
import { CompanyInterviews } from "./CompanyInterviews";

export function CompanyViewControl() {
    let location = useLocation();
    let state = location.state as Company;
    const dispatch = useDispatch();
    const companySlice = useSelector((state: RootState) => state.companyInterview);

    useEffect(() => {
        if (companySlice.company.companyName) {
            localStorage.setItem('company', JSON.stringify(companySlice.company));
        }
    }, [companySlice]);

    useEffect(() => {
        var company = localStorage.getItem('company');
        if (!company) {
            dispatch(setStateCompany(state));
        } else {
            var com = JSON.parse(company) as Company;
            if (com.companyName === state.companyName) {
                dispatch(setStateCompany(com));
            } else {
                localStorage.setItem('company', JSON.stringify(state));
                dispatch(setStateCompany(state));
            }
        }
    }, [dispatch, state])

    function submitSameCompany(e: React.FormEvent<HTMLFormElement>) {
        submitInterviewSameCompany(e)
            .then((res: Interview) => {
                dispatch(AddInterView(res));
            });
        hideModal(e, e.currentTarget.companyName.value + "Modal");
    }

    function submitInformation(e: React.FormEvent<HTMLFormElement>) {
        submitAddInformation(e)
            .then((res: InformationInterview) => {
                dispatch(setStateInformation(res));
            });
        hideModal(e,"interview" +e.currentTarget.idInterview.value + e.currentTarget.companyName.value + "Modal");
    }

    function hideModal(e: React.FormEvent<HTMLFormElement>, nameModal : string) {
        var myModalAddProcess = document.getElementById(nameModal);
        if (myModalAddProcess) {
            document.getElementsByClassName('modal-backdrop')[0].remove();
            myModalAddProcess.hidden = true;
        }
    }

    return (<CompanyInterviews company={companySlice.company} submitProcessSelection={submitSameCompany} SubmitInterview={submitInformation} />)
}