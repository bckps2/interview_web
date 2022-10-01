import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Interview, Process } from "../../../Models/InterviewModel";
import { addInterview } from "../../../Services/RequestService";
import { ModalInterview } from "../../Modals/modalInterview";
import { EditInterview } from "../views/editInterviewForm";

interface props {
    process: Process,
    companyName: string
}

export function InterviewControl({ process, companyName }: props) {

    const initialValue = process;
    const [processInterviews = initialValue, setState] = useState({} as Process);

    function submitInterview(e: React.FormEvent<HTMLFormElement>) {
        addInterview(e)
            .then((res: Interview) => {
                var processStorage = sessionStorage.getItem('process');
                if (processStorage) {
                    var processEntity = JSON.parse(processStorage) as Interview[];
                    processEntity.push(res);
                    sessionStorage.setItem('process', JSON.stringify(process));
                }

                processInterviews.interviews.push(res);
                setState(processInterviews);
            });
    }

    return (
        <div>
            {processInterviews.interviews?.length > 0 &&
                processInterviews.interviews?.map((interview, index) => {
                    return (
                        <EditInterview interview={interview} showButton={true} deleteInformation={undefined} id={interview.idInterview} />
                    )
                })
            }
            <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#interview" + process.idProcess + "Modal"} >
                Añadir entrevista
            </Button>
            <ModalInterview submit={submitInterview} idProcess={process.idProcess} />
        </div>
    )
}