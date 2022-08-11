import { useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { Company, Interview, Process } from "../../../Models/InterviewModel";
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

    const [interviews, setInterviews] = useState({} as Process[]);

    useEffect(() => {
        GetAllProcessByCompany(idCompany)
            .then((res: Process[]) => {
                setInterviews(res);
            })

    }, [setInterviews, idCompany]);

    function submitProcess(e: React.FormEvent<HTMLFormElement>) {
        addProcess(e)
            .then((res: Company) => {
                // dispatch(addNewCompany(res));
                var companiesStorage = sessionStorage.getItem('companies');
                if (companiesStorage) {
                    var companies = JSON.parse(companiesStorage) as Company[];
                    companies.push(res);
                    sessionStorage.setItem('companies', JSON.stringify(companies));
                }
            });
        hideModal("NewCompanyModal");
    }
    return (
        <div>
            {interviews?.length > 0 &&
                interviews?.map((interview, index) => {
                    return (
                        <Accordion>
                            <Accordion.Item eventKey={index.toString()} >
                                <Accordion.Header aria-expanded={false} >Proceso de selección {index + 1}</Accordion.Header>
                                <Accordion.Body>
                                    <ProcessForm companyName={companyName} idCompany={idCompany} interview={interview} />
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
            <NewProcessSelection submit={null} companyName={companyName} idCompany={idCompany} />
        </div>
    )
}

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
