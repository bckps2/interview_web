import { Accordion, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PropsProcessView } from "./interfaceProcess";
import { ModalInterview } from "./../Forms/interview/interviewModalView";
import { ProcessForm } from "../Forms/process/processFormView";
import { ModalProcess } from "../Forms/process/processModalView";
import { InterviewEdit } from "../Forms/interview/interviewFormView";
import { useState } from "react";

export function ProcessView(props : PropsProcessView) {
    const navigate = useNavigate();

 

    return (
        <div id="groupInterview" className="subBody">
            <Button onClick={() => navigate('/InterViews')}>Back to Companies</Button>
            <ListGroup>
                <p>Nombre de compañia</p>
                <ListGroup.Item>{props.company?.companyName ?? "Not found process or company"}</ListGroup.Item>
            </ListGroup>

            {props.processes?.length > 0 &&
                props.processes?.map((process, index) => {
                    return (
                        <Accordion>
                            <Accordion.Item eventKey={index.toString()} >
                                <Accordion.Header aria-expanded={false} >Proceso de selección {index + 1}</Accordion.Header>
                                <Accordion.Body>
                                    <ProcessForm companyName={props.company.companyName} idCompany={props.company.idCompany} process={process} key={index}/>
                                    <div>
                                        {process.interviews?.length > 0 &&
                                            process.interviews?.map((interview, index) => {
                                                return (
                                                    <InterviewEdit showEdiButtons={true} interview={interview} key={index} />
                                                )
                                            })
                                        }
                                        <ModalInterview idProcess={process.idProcess} />
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    )
                })
            }
            {props.company?.companyName !== undefined &&
                <>
                    <ModalProcess action={props.submitProcess} companyName={props.company?.companyName} idCompany={props.company?.idCompany} />
                </>
            }
        </div>
    )
}
