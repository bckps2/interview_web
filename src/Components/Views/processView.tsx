import { Accordion, Button, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ModalInterview } from "../Modals/interviewModalView";
import { ProcessForm } from "../Forms/processFormView";
import { ModalProcess } from "../Modals/processModalView";
import { InterviewEdit } from "../Forms/interviewFormView";
import { useDispatch, useSelector } from "react-redux";
import { endpointsCompany, endpointsProcess } from "../../Models/Url";
import { GetById, requestDelete } from "../../Services/RequestService";
import { Company, Process, ValueResponse } from "../../Models/InterviewModel";
import { deleteProcessState, processesState } from "../../redux/reducers/processSlice";
import { RootState } from "../../redux/store/store";
import { useEffect } from "react";

let idParams = 0;
let isLoading = false;
let company = {} as Company;

export function ProcessView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();
    const processSlice = useSelector((state: RootState) => state.processInterview);

    useEffect(() => {
        if (!isNaN(Number(id))) {
            if (!isLoading || Number(id) !== idParams) {
                idParams = Number(id);
                isLoading = true;
                GetById(endpointsCompany.GetCompanyById, Number(id))
                    .then((res: ValueResponse<Company>) => {
                        if (res.value) {
                            company = res.value;
                            dispatch(processesState(res.value.process));
                        }
                    });
            }
        }
    }, [dispatch, id, processSlice.processes]);
    
    function deleteProcess(event: any, idProcess: number | undefined) {
        if (idProcess) {
            requestDelete(event, endpointsProcess.DeleteProcess, idProcess)
                .then((res: ValueResponse<Process>) => {
                    if (res) {
                        dispatch(deleteProcessState(res.value));
                    }
                });
        }
    }

    return (
        <div id="groupInterview" className="subBody">
            <Button onClick={() => navigate('/InterViews')}>Back to Companies</Button>
            <ListGroup>
                <p>Nombre de compañia</p>
                <ListGroup.Item>{company?.companyName ?? "Not found process or company"}</ListGroup.Item>
            </ListGroup>

            {company.process?.length > 0 &&
                company.process?.map((process, index) => {
                    return (
                        <Accordion>
                            <Accordion.Item eventKey={index.toString()} >
                                <Accordion.Header aria-expanded={false} >
                                    <div style={{ width: "100%" }}>
                                        Proceso de selección {index + 1} 
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body> 
                                    <ProcessForm showButtonDelete={true} companyName={company.companyName} idCompany={company.idCompany} process={process} key={index} />
                                    <div>
                                        {process.interviews?.length > 0 &&
                                            process.interviews?.map((interview, index) => {
                                                return (
                                                    <InterviewEdit idProcess={process.idProcess} showEdiButtons={true} interview={interview} key={index} />
                                                )
                                            })
                                        }
                                        <ModalInterview idProcess={process.idProcess} />
                                    </div>
                                    {<Button style={{ marginTop: "10px", lineHeight: "20px", marginBottom: "30px" }} type="button" onClick={(e) => deleteProcess(e, process?.idProcess)} className="btn btn-outline-dark">
                                        Eliminar proceso de selección
                                    </Button>
                                    }
                                </Accordion.Body>

                            </Accordion.Item>
                        </Accordion>
                    )
                })
            }
            {company?.companyName !== undefined &&
                <>
                    <ModalProcess companyName={company?.companyName} idCompany={company?.idCompany} />
                </>
            }
        </div>
    )
}
