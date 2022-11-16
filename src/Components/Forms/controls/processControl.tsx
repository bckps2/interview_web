import { useEffect } from "react";
import { Accordion, Button, ListGroup } from "react-bootstrap";
import { Company, Interview, Process } from "../../../Models/InterviewModel";
import { addInterview, addProcess, deleteInterview, GetCompanyById } from "../../../Services/RequestService";
import { NewProcessSelection } from "../../Modals/modalProcess";
import { ProcessForm } from "../views/processForm";
import { RootState } from "../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addProcessState, processesState, addInterviewInProcess, deleteInterviewState } from "../../../redux/reducers/processSlice";
import { useParams } from "react-router-dom";
import { EditInterview } from "../views/editInterviewForm";
import { ModalInterview } from "../../Modals/modalInterview";

let company  = {} as Company;
let isLoading = false;
let idParams = 0;

export function ProcessControl() {

    let {id} = useParams();
    const dispatch = useDispatch();
    const processSlice = useSelector((state: RootState) => state.processInterview);

    useEffect(() => {
        if (!isNaN(Number(id))) {
            if (!isLoading || Number(id) !== idParams) {
                idParams = Number(id);
                isLoading = true;
                GetCompanyById(Number(id)).then((res: Company) => {
                    company = res;
                    dispatch(processesState(res.process));
                });
            }
        }
    }, [dispatch, id, processSlice.processes]);

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
                <ListGroup.Item>{company?.companyName ?? "No Company found"}</ListGroup.Item>
            </ListGroup>

            {processSlice.processes?.length > 0 &&
                processSlice.processes?.map((process, index) => {
                    return (

                        <Accordion>
                            <Accordion.Item eventKey={index.toString()} >
                                <Accordion.Header aria-expanded={false} >Proceso de selección {index + 1}</Accordion.Header>
                                <Accordion.Body>
                                    <ProcessForm companyName={company.companyName} idCompany={company.idCompany} process={process} />
                                    <div>
                                        {process.interviews?.length > 0 &&
                                            process.interviews?.map((interview, index) => {
                                                console.log(interview.idInterview);
                                                return (
                                                    <EditInterview interview={interview} showButton={true} id={interview.idInterview} />
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
            {company?.companyName !== undefined && 
                 <><Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#processSelectionModal"}>
                    Añadir nuevo proceso de selección
                </Button><NewProcessSelection submit={submitProcess} companyName={company?.companyName} idCompany={company?.idCompany} /></>
            }
        </div>
    )
}
