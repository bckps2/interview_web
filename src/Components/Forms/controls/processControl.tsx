import { useEffect } from "react";
import { Accordion, Button, ListGroup } from "react-bootstrap";
import { Company, Interview, Process } from "../../../Models/InterviewModel";
import { addInterview, addProcess } from "../../../Services/RequestService";
import { NewProcessSelection } from "../../Modals/modalProcess";
import { ProcessForm } from "../views/processForm";
import { RootState } from "../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addProcessState, processesState, addInterviewInProcess } from "../../../redux/reducers/processSlice";
import { useLocation } from "react-router-dom";
import { EditInterview } from "../views/editInterviewForm";
import { ModalInterview } from "../../Modals/modalInterview";

export function ProcessControl() {

    let location = useLocation();
    let state = location.state as Company;

    const processSlice = useSelector((state: RootState) => state.processInterview);
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(processesState(state.process));
    }, [dispatch, state]);

    function submitProcess(e: React.FormEvent<HTMLFormElement>) {
        addProcess(e)
            .then((res: Process) => {
                dispatch(addProcessState(res));
            });
    }

    function submitInterview(e: React.FormEvent<HTMLFormElement>) {
        addInterview(e)
            .then((res: Interview) => {
                dispatch(addInterviewInProcess(res));
            });
    }

    return (
        <div id="groupInterview" className="subBody">
            <ListGroup>
                <p>Nombre de compañia</p>
                <ListGroup.Item>{state.companyName}</ListGroup.Item>
            </ListGroup>

            {processSlice.processes?.length > 0 &&
                processSlice.processes?.map((process, index) => {
                    return (

                        <Accordion>
                            <Accordion.Item eventKey={index.toString()} >
                                <Accordion.Header aria-expanded={false} >Proceso de selección {index + 1}</Accordion.Header>
                                <Accordion.Body>
                                    <ProcessForm companyName={state.companyName} idCompany={state.idCompany} process={process} />
                                    <div>
                                        {process.interviews?.length > 0 &&
                                            process.interviews?.map((interview, index) => {
                                                return (
                                                    <EditInterview interview={interview} showButton={true} deleteInformation={undefined} id={interview.idInterview} />
                                                )
                                            })
                                        }
                                        <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#interview" + process.idProcess + "Modal"} >
                                            Añadir entrevista
                                        </Button>
                                        <ModalInterview submit={submitInterview} idProcess={process.idProcess} />
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    )
                })
            }
            <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#processSelectionModal"} >
                Añadir nuevo proceso de selección
            </Button>
            <NewProcessSelection submit={submitProcess} companyName={state.companyName} idCompany={state.idCompany} />

        </div>
    )
}
