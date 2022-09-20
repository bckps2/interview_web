import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Company } from "../../Models/InterviewModel";
import { setStateCompany } from "../../redux/reducers/interviewSlice";
// import { AddInterView, deleteInformation, deleteInterview, setStateCompany, setStateInformation } from "../../redux/reducers/interviewSlice";
import { CompanyInterviews } from "./CompanyInterviews";

export function CompanyViewControl() {
    let location = useLocation();
    let state = location.state as Company;

    const dispatch = useDispatch();

    useEffect(() => {
        if (state.companyName) {
            sessionStorage.setItem('company', JSON.stringify(state));
        }
    }, [state]);

    useEffect(() => {
        var company = sessionStorage.getItem('company');
        if (!company) {
            dispatch(setStateCompany(state));
        } else {
            var com = JSON.parse(company) as Company;
            if (com.companyName === state.companyName) {
                dispatch(setStateCompany(com));
            } else {
                sessionStorage.setItem('company', JSON.stringify(state));
                dispatch(setStateCompany(state));
            }
        }
    }, [dispatch, state])

    // function submitSameCompany(e: React.FormEvent<HTMLFormElement>) {
    //     submitInterviewSameCompany(e)
    //         .then((res: Interview) => {
    //             dispatch(AddInterView(res));
    //             hideModal(nameModal);
    //         })
    //     nameModal = e.currentTarget.companyName.value + "Modal";
    // }

    // function submitInformation(e: React.FormEvent<HTMLFormElement>) {
    //     submitAddInformation(e)
    //         .then((res: InformationInterview) => {
    //             hideModal(nameModal);
    //             dispatch(setStateInformation(res));
    //         })
    //     nameModal = "interview" + e.currentTarget.idInterview.value + e.currentTarget.companyName.value + "Modal";
    // }

    // function DeleteInformation(event: any, idInformation: number) {
    //     deleteInformationInterview(event, idInformation)
    //         .then((response) => {
    //             if (response.interViewIdInterView) {
    //                 let companySession = sessionStorage.getItem('company');
    //                 if (companySession) {
    //                     let company = JSON.parse(companySession) as Company;
    //                     sessionStorage.setItem('company', JSON.stringify(company));
    //                     dispatch(deleteInformation(response));
    //                 }
    //             }
    //         })
    // }

    // function DeleteInterView(event: any, idInterview: number) {
    //     deleteInterviewDb(event, idInterview).then((response) => {
    //         if (response.idInterView) {
    //             let companySession = sessionStorage.getItem('company');
    //             if (companySession) {
    //                 let company = JSON.parse(companySession) as Company;
    //                 sessionStorage.setItem('company', JSON.stringify(company));
    //                 dispatch(deleteInterview(response));
    //             }
    //         }
    //     })
    // }

    const props = {
        company: state,
        actions: {
            deleteInformation: null,
            deleteInterview: null,
            SubmitInterview: null,
            submitProcessSelection: null
        }
    }

    return (<CompanyInterviews company={props.company} actions={props.actions} />)
}