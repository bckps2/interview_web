import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Interview } from "../../../Models/InterviewModel";
import { GetAllInterviewsByProcess } from "../../../Services/RequestService";
import { ModalInterview } from "../../Modals/modalInterview";
import { EditInterview } from "../views/editInterviewForm";

interface props {
    idInterview: number,
    companyName: string
}

export function InterviewControl({ idInterview, companyName }: props) {

    const [informations, setInformations] = useState({} as Interview[]);

    useEffect(() => {
        GetAllInterviewsByProcess(idInterview)
            .then((res: Interview[]) => {
                setInformations(res);
            })
    }, [setInformations, idInterview]);

    return (
        <div>
            {informations?.length > 0 &&
                informations?.map((information, index) => {
                    return (
                        <EditInterview information={information} showButton={true} deleteInformation={undefined} id={information.idInformation} />
                    )
                })
            }
            <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#interview" + idInterview + "Modal"} >
                Añadir entrevista
            </Button>
            <ModalInterview submit={null} idInterview={idInterview} />
        </div>
    )
}