import { useEffect } from "react";
import { Accordion, Button, ListGroup } from "react-bootstrap";
import { Company, Interview, Process } from "../../../Models/InterviewModel";
import { GetById, requestAdd } from "../../../Services/RequestService";
import { ModalProcess, ProcessForm } from "../views/processForm";
import { RootState } from "../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addInterviewInProcess, addProcessState, processesState } from "../../../redux/reducers/processSlice";
import { useNavigate, useParams } from "react-router-dom";
import { endpointsCompany, endpointsInterview, endpointsProcess } from "../../../Models/Url";
import { EditInterview, ModalInterview } from "../views/interviewForm";

let company = {} as Company;
let isLoading = false;
let idParams = 0;

export function ProcessControl() {

    let { id } = useParams();
    const dispatch = useDispatch();
    const processSlice = useSelector((state: RootState) => state.processInterview);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isNaN(Number(id))) {
            if (!isLoading || Number(id) !== idParams) {
                idParams = Number(id);
                isLoading = true;
                GetById(endpointsCompany.GetCompanyById, Number(id))
                    .then((res: Company) => {
                        if (res) {
                            company = res;
                            dispatch(processesState(res.process));
                        }
                    });
            }
        }
    }, [dispatch, id, processSlice.processes]);

    function submitInterview(e: React.FormEvent<HTMLFormElement>) {
        requestAdd(endpointsInterview.AddInterview, 'interview', e)
            .then((res: Interview) => {
                if (res) {
                    dispatch(addInterviewInProcess(res));
                }
            });
    }
    
    function submitProcess(e: React.FormEvent<HTMLFormElement>) {
        requestAdd(endpointsProcess.AddProcess, 'process', e)
            .then((res: Process) => {
                if (res) {
                    dispatch(addProcessState(res));
                }
            });
    }
    
    return (
        <div id="groupInterview" className="subBody">
            <Button onClick={() => navigate('/InterViews')}>Back to Companies</Button>
            <ListGroup>
                <p>Nombre de compañia</p>
                <ListGroup.Item>{company?.companyName ?? "Not found process or company"}</ListGroup.Item>
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
                                                return (
                                                    <EditInterview interview={interview} />
                                                )
                                            })
                                        }
                                        <ModalInterview action={submitInterview} idProcess={process.idProcess} />
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    )
                })
            }
            {company?.companyName !== undefined &&
                <>
                    <ModalProcess action={submitProcess} companyName={company?.companyName} idCompany={company?.idCompany} />
                </>
            }
        </div>
    )
}
