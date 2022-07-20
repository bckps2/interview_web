import { Accordion, Button, Form, ListGroup } from "react-bootstrap";
import { Company } from "../../Models/InterviewModel";
import { FormInformation } from "../Forms/informationForm";
import { FormInterview } from "../Forms/interviewForm";
import { NewInterViewProcessSelection } from "../Modals/modalNewInterview";
import { NewProcessSelection } from "../Modals/modalNewProcess";

interface props {
    company: Company,
    submitProcessSelection: any,
    SubmitInterview: any
}

export const CompanyInterviews = ({ company, submitProcessSelection, SubmitInterview }: props) => {

    if (company.companyName === undefined) {
        return <div><p>No hay entrevistas</p></div>
    }

    return (
        <div id="groupInterview" className="subBody">
            <ListGroup>
                <p>Nombre de compañia</p>
                <ListGroup.Item>{company.companyName}</ListGroup.Item>
                {/* <ListGroup.Item>{company.dateCreated.toString()}</ListGroup.Item> */}
            </ListGroup>
            <Accordion >
                {/* Start Accordion */}
                {company.interViews.map((interview, index) => {
                    return (
                        <Accordion.Item eventKey={index.toString()} key={"companys" + index}>
                            <Accordion.Header aria-expanded={false} >Proceso de selección {index + 1}</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    <Form >
                                        <FormInterview interview={interview} />
                                        <input type="hidden" value={company.idCompany} name="idCompany"></input>
                                        <input type="hidden" value={company.companyName} name="companyName"></input>
                                        {interview.informationInterViews.map((information) => {
                                            return (
                                                <div>
                                                    <p>Información Entrevista</p>
                                                    <FormInformation information={information} />
                                                    <input type="hidden" value={interview.idInterView} name="idInterview"></input>
                                                    <input type="hidden" value={company.companyName} name="companyName"></input>
                                                    <Button type="button" className="btn btn-outline-dark">
                                                        Editar entrevista
                                                    </Button>
                                                </div>
                                            );
                                        })}

                                    </Form>


                                </ListGroup>
                                <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#interview" + interview.idInterView + company.companyName + "Modal"} >
                                    Añadir entrevista
                                </Button>
                                <NewInterViewProcessSelection submit={SubmitInterview} idInterview={interview.idInterView} companyName={company.companyName} />
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
                <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#" + company.companyName + "Modal"} >
                    Añadir nuevo proceso de selección
                </Button>
                <NewProcessSelection submit={submitProcessSelection} companyName={company.companyName} idCompany={company.idCompany} />
                {/* finish Accordion */}
            </Accordion>
        </div>
    );
}
