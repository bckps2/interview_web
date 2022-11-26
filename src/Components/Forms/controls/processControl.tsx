import { useEffect } from "react";
import { Accordion, Button, ListGroup } from "react-bootstrap";
import { Company, Process } from "../../../Models/InterviewModel";
import { GetById } from "../../../Services/RequestService";
import { NewProcessSelection } from "../../Modals/modalProcess";
import { ProcessForm } from "../views/processForm";
import { RootState } from "../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { processesState } from "../../../redux/reducers/processSlice";
import { useNavigate, useParams } from "react-router-dom";
import { EditInterview } from "../views/editInterviewForm";
import { ModalInterview } from "../../Modals/modalInterview";
import { endpointsCompany } from "../../../Models/Url";

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
                                                    <EditInterview interview={interview} id={interview.idInterview} />
                                                )
                                            })
                                        }
                                        <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#interview" + process.idProcess + "Modal"} >
                                            Añadir entrevista
                                        </Button>
                                        <ModalInterview idProcess={process.idProcess} />
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    )
                })
            }
            {company?.companyName !== undefined &&
                <>
                    <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#processSelectionModal"}>
                        Añadir nuevo proceso de selección
                    </Button>
                    <NewProcessSelection companyName={company?.companyName} idCompany={company?.idCompany} />
                </>
            }
        </div>
    )
}
