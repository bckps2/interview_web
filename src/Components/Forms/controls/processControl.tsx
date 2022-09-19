import { useEffect, useRef, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { isNumberObject } from "util/types";
import { Company, Process } from "../../../Models/InterviewModel";
import { addProcess, GetAllProcessByCompany } from "../../../Services/RequestService";
import { hideModal } from "../../../Utils/utilsModal";
import { NewProcessSelection } from "../../Modals/modalProcess";
import { ProcessForm } from "../views/processForm";
import { InterviewControl } from "./interviewControl";

interface props {
    idCompany: number,
    companyName: string
}

export function ProcessControl({ idCompany, companyName }: props) {

    const refFecth = useRef(false);

    const [process, setProcess] = useState({} as Process[]);
    console.log("esta es la compañia :" + idCompany);

    useEffect(() => {
        if (!refFecth.current && idCompany !== undefined && idCompany !== null && !isNaN(idCompany)) {
            refFecth.current = true;
            GetAllProcessByCompany(idCompany)
                .then((res: Process[]) => {
                    setProcess(res);
                })
        }

    }, [setProcess, idCompany]);

    function submitProcess(e: React.FormEvent<HTMLFormElement>) {
        addProcess(e)
            .then((res: Process) => {
                // dispatch(addNewCompany(res));
                var processStorage = sessionStorage.getItem('process');
                if (processStorage) {
                    var processEntity = JSON.parse(processStorage) as Process[];
                    processEntity.push(res);
                    sessionStorage.setItem('process', JSON.stringify(process));
                }
                process.push(res);
                setProcess(process);
            });
        hideModal("NewCompanyModal");
    }
    return (
        <div>
            {process?.length > 0 &&
                process?.map((interview, index) => {
                    return (
                        <Accordion>
                            <Accordion.Item eventKey={index.toString()} >
                                <Accordion.Header aria-expanded={false} >Proceso de selección {index + 1}</Accordion.Header>
                                <Accordion.Body>
                                    <ProcessForm companyName={companyName} idCompany={idCompany} process={interview} />
                                    <InterviewControl companyName={companyName} idInterview={interview.idInterView} />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    )
                })
            }
            <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#processSelectionModal"} >
                Añadir nuevo proceso de selección
            </Button>
            <NewProcessSelection submit={submitProcess} companyName={companyName} idCompany={idCompany} />
        </div>
    )
}
