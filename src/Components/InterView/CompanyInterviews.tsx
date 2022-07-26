import { useState } from "react";
import { Accordion, Button, Form, ListGroup } from "react-bootstrap";
import { Company } from "../../Models/InterviewModel";
import { EditInformation } from "../Forms/informationForm";
import { FormInterview } from "../Forms/interviewForm";
import { NewInterViewProcessSelection } from "../Modals/modalNewinterView";
import { NewProcessSelection } from "../Modals/modalNewProcess";

interface props {
    company: Company,
    actions: {
        submitProcessSelection: any,
        SubmitInterview: any,
        deleteInformation: any,
        deleteInterview: any
    }
}

export const CompanyInterviews = ({ company, actions }: props) => {
    return (
        <div id="groupInterview" className="subBody">
            <ListGroup>
                <p>Nombre de compañia</p>
                <ListGroup.Item>{company.companyName}</ListGroup.Item>
            </ListGroup>
            <Accordion >
                {company?.interViews?.map((interview, index) => {
                    return (
                        <Accordion.Item eventKey={index.toString()} key={"companys" + index}>
                            <Accordion.Header aria-expanded={false} >
                                Proceso de selección {index + 1}
                                <Button type="button" onClick={(e) => actions.deleteInterview(e, interview.idInterView)} className="btn btn-outline-dark">
                                    Eliminar proceso de selección
                                </Button>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    <div>
                                        <FormInterview interview={interview} />
                                        <input type="hidden" value={company.idCompany} name="idCompany"></input>
                                        <input type="hidden" value={company.companyName} name="companyName"></input>
                                        {interview.informationInterViews.map((information) => {
                                            return (
                                                <div id={"informationInterview" + interview.companyIdCompany} >
                                                    <p>Información Entrevista</p>
                                                    <EditInformation deleteInformation={actions.deleteInformation} information={information} showButton={true} />
                                                    <input type="hidden" value={interview.idInterView} name="idInterview"></input>
                                                    <input type="hidden" value={company.companyName} name="companyName"></input>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </ListGroup>
                                <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#interview" + interview.idInterView + company.companyName + "Modal"} >
                                    Añadir entrevista
                                </Button>
                                <NewInterViewProcessSelection submit={actions.SubmitInterview} idInterview={interview.idInterView} companyName={company.companyName} />
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}

                <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#" + company.companyName + "Modal"} >
                    Añadir nuevo proceso de selección
                </Button>
                <NewProcessSelection submit={actions.submitProcessSelection} companyName={company.companyName} idCompany={company.idCompany} />
            </Accordion>
        </div>
    );
}
