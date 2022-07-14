import { useEffect } from "react";
import { Accordion, Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Company, Interview } from "../../Models/InterviewModel";
import { AddInterView, setStateCompany } from "../../redux/reducers/interviewSlice";
import { RootState } from "../../redux/store/store";
import { submitInterviewSameCompany } from "../../Services/RequestService";
import { NewProcessOfSelection } from "../Modals/ModalNewinterView";

export const CompanyInterviews = () => {
    
    let location = useLocation();
    let state = location.state as Company;
    const dispatch = useDispatch();
    const companySlice = useSelector((state: RootState) => state.companyInterview);

    useEffect(() => {
        if(companySlice.company.companyName){
            localStorage.setItem('company', JSON.stringify(companySlice.company));
        }
    }, [companySlice]);

    useEffect(() => {
        var fff = localStorage.getItem('company');
        if(!fff){
            dispatch(setStateCompany(state));
        }else{
            var com = JSON.parse(fff) as Company;
            if(com.companyName === state.companyName){
                dispatch(setStateCompany(com));
            }else{
                localStorage.setItem('company', JSON.stringify(state));
                dispatch(setStateCompany(state));
            }
        }
    }, [dispatch])

    function submitSameCompany(e: React.FormEvent<HTMLFormElement>) {
        submitInterviewSameCompany(e)
            .then((res: Interview) => {
                dispatch(AddInterView(res));
            });
        hideModal(e);
    }

    function hideModal(e: React.FormEvent<HTMLFormElement>) {
        var myModalAddProcess = document.getElementById(e.currentTarget.companyName.value + "Modal");
        if (myModalAddProcess) {
            document.getElementsByClassName('modal-backdrop')[0].remove();
            myModalAddProcess.hidden = true;
        } 
    }

    if (companySlice.company.companyName === undefined) {
        return <div><p>No hay entrevistas</p></div>
    }

    return (
        <div>
            <ListGroup>
                <p>Nombre de compañia</p>
                <ListGroup.Item>{companySlice.company.companyName}</ListGroup.Item>
                {/* <ListGroup.Item>{company.dateCreated.toString()}</ListGroup.Item> */}
            </ListGroup>
            <Accordion >
                {/* Start Accordion */}
                {companySlice.company.interViews.map((interview, index) => {
                    return (
                        <Accordion.Item eventKey={index.toString()}>
                            <Accordion.Header aria-expanded={false} >Proceso de selección {index + 1}</Accordion.Header>
                            <Accordion.Body>
                                <p>Rango salarial</p>
                                <ListGroup>
                                    <ListGroup.Item>{interview.rangeSalarial}</ListGroup.Item>
                                </ListGroup>
                                {interview.informationInterViews.map((information) => {
                                    return (
                                        <div>
                                            <p>Entrevista</p>
                                            <ListGroup>
                                                <ListGroup.Item>{information.dateInterView.toString()}</ListGroup.Item>
                                                <ListGroup.Item>{information.email}</ListGroup.Item>
                                                <ListGroup.Item>{information.observations}</ListGroup.Item>
                                                <ListGroup.Item>{information.typeInterView}</ListGroup.Item>
                                            </ListGroup>

                                            <p>Nombre de entrevistadores</p>
                                            {information.nameInterViewers.map((interviewer) => {

                                                return (
                                                    <ListGroup>
                                                        <ListGroup.Item>{interviewer}</ListGroup.Item>
                                                    </ListGroup>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </Accordion.Body>
                        </Accordion.Item>
                    );
                })};
                <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#" + companySlice.company.companyName + "Modal"} >
                    Añadir nuevo proceso de selección
                </Button>
                <NewProcessOfSelection submit={submitSameCompany} companyName={companySlice.company.companyName} idCompany={companySlice.company.idCompany} />
                {/* finish Accordion */}
            </Accordion>

        </div >
    );
}
