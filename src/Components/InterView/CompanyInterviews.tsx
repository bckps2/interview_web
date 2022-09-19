import { Accordion, Button, ListGroup } from "react-bootstrap";
import { Company } from "../../Models/InterviewModel";
import { NewInterViewProcessSelection } from "../Modals/ModalNewinterView";
import { NewProcessSelection } from "../Modals/ModalNewProcess";

interface props {
    company: Company,
    submitProcessSelection: any,
    SubmitInterview:any
}

export const CompanyInterviews = ({ company, submitProcessSelection,SubmitInterview }: props) => {

    if (company.companyName === undefined) {
        return <div><p>No hay entrevistas</p></div>
    }

    return (
        <div  id="groupInterview" className="subBody">
            <ListGroup>
                <p>Nombre de compañia</p>
                <ListGroup.Item>{company.companyName}</ListGroup.Item>
                {/* <ListGroup.Item>{company.dateCreated.toString()}</ListGroup.Item> */}
            </ListGroup>
            <Accordion >
                {/* Start Accordion */}
                {company.interViews.map((interview, index) => {
                    return (
                        <Accordion.Item eventKey={index.toString()} key={"companys"+index}>
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
                                <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#interview" + interview.idInterView+ company.companyName + "Modal"} >
                                    Añadir entrevista
                                </Button>
                                <NewInterViewProcessSelection submit={SubmitInterview} idInterview={interview.idInterView} companyName={company.companyName}/>
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
