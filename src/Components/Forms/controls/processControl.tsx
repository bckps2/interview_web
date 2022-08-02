import { useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { Interview } from "../../../Models/InterviewModel";
import { GetAllProcessByCompany } from "../../../Services/RequestService";
import { NewProcessSelection } from "../../Modals/modalNewProcess";
import { FormInterview } from "../views/interviewForm";
import { InterviewControl } from "./interviewControl";

interface props {
    idCompany: number,
    companyName: string
}

export function ProcessControl({ idCompany, companyName }: props) {

    const [interviews, setInterviews] = useState({} as Interview[]);

    useEffect(() => {
        GetAllProcessByCompany(idCompany)
            .then((res: Interview[]) => {
                setInterviews(res);
            })

    }, [setInterviews]);

    return (
        <div>
            {interviews?.length > 0 &&
                interviews?.map((interview, index) => {
                    return (
                        <Accordion>
                            <Accordion.Item eventKey={index.toString()} >
                                <Accordion.Header aria-expanded={false} >Proceso de selección {index + 1}</Accordion.Header>
                                <Accordion.Body>
                                    <FormInterview companyName={companyName} idCompany={idCompany} interview={interview} submit={null} />
                                    <InterviewControl companyName={companyName} idInterview={interview.idInterView} />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    )
                })
            }
            <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#processSelection" + idCompany + "Modal"} >
                Añadir nuevo proceso de selección
            </Button>
            <NewProcessSelection submit={null} companyName={companyName} idCompany={idCompany} />
        </div>
    )
}