import { useCallback, useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { Process } from "../../../Models/InterviewModel";
import { addProcess, GetAllProcessByCompany } from "../../../Services/RequestService";
import { NewProcessSelection } from "../../Modals/modalProcess";
import { ProcessForm } from "../views/processForm";
import { InterviewControl } from "./interviewControl";

interface props {
    idCompany: number,
    companyName: string
}

export function ProcessControl({ idCompany, companyName }: props) {
    const [processes, setProcesses] = useState({} as Process[]);
    let isLoaded = false;
    const getDataProcess = useCallback(async () => {
        const res = await GetAllProcessByCompany(idCompany);
        
        if (!isLoaded) {
            setProcesses(res);
        }
        
        isLoaded = true;
    }, [idCompany, processes]);

    useEffect(() => {
        getDataProcess();
    }, [getDataProcess]);

    function submitProcess(e: React.FormEvent<HTMLFormElement>) {
        addProcess(e)
            .then((res: Process) => {
                var processStorage = sessionStorage.getItem('process');
                if (processStorage) {
                    var processEntity = JSON.parse(processStorage) as Process[];
                    processEntity.push(res);
                    sessionStorage.setItem('process', JSON.stringify(process));
                }
                processes.push(res);
                setProcesses(processes);
            });
    }

    return (
        <div>
            {processes?.length > 0 &&
                processes?.map((process, index) => {
                    return (
                        <Accordion>
                            <Accordion.Item eventKey={index.toString()} >
                                <Accordion.Header aria-expanded={false} >Proceso de selección {index + 1}</Accordion.Header>
                                <Accordion.Body>
                                    <ProcessForm companyName={companyName} idCompany={idCompany} process={process} />
                                    <InterviewControl companyName={companyName} process={process} />
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
