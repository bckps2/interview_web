import { useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { InformationInterview, Interview } from "../../../Models/InterviewModel";
import { GetAllInterviewsByProcess } from "../../../Services/RequestService";
import { NewInterViewProcessSelection } from "../../Modals/modalNewinterView";
import { EditInformation } from "../views/informationForm";
import { FormInterview } from "../views/interviewForm";

interface props {
    idInterview: number,
    companyName: string
}

export function InterviewControl({ idInterview, companyName }: props) {

    const [informations, setInformations] = useState({} as InformationInterview[]);

    useEffect(() => {
        GetAllInterviewsByProcess(idInterview)
            .then((res: InformationInterview[]) => {
                setInformations(res);
            })
    }, [setInformations]);

    return (
        <div>
            {informations?.length > 0 &&
                informations?.map((information, index) => {
                    return (
                        <EditInformation information={information} showButton={true} deleteInformation={undefined} id={information.idInformation} />
                    )
                })
            }
            <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#interview" + idInterview + "Modal"} >
                Añadir entrevista
            </Button>
            <NewInterViewProcessSelection submit={null} idInterview={idInterview} />
        </div>
    )
}