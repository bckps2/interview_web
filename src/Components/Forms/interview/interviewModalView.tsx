import { useState } from "react";
import { useDispatch } from "react-redux";
import { Interview } from "../../../Models/InterviewModel";
import { endpointsInterview } from "../../../Models/Url";
import { addInterviewInProcess } from "../../../redux/reducers/processSlice";
import { requestAdd } from "../../../Services/RequestService";
import { GenericModal } from "../../Modals/genericFormModal";
import { InterviewForm } from "./interviewFormView";

interface propsInterviewModal {
    idProcess: number
}

export const ModalInterview = ({ idProcess }: propsInterviewModal) => {

    const dispatch = useDispatch();
    const [readOnly, setReadOnly] = useState(false);

    function submitInterview(e: React.FormEvent<HTMLFormElement>) {
        requestAdd(endpointsInterview.AddInterview, 'interview', e)
            .then((res: Interview) => {
                if (res) {
                    dispatch(addInterviewInProcess(res));
                }
            });
    }

    const FormInputs = () => {
        return (
            <span>
                <InterviewForm interview={null} showEdiButtons={false} readOnly={readOnly} setReadOnly={setReadOnly}/>
                <input type="hidden" value={idProcess} name="idProcess" />
            </span>
        )
    }

    return (
        <GenericModal action={submitInterview} FormInputs={FormInputs} headerModal="Nueva entrevista" titleButton="Añadir nueva entrevista" />
    )
}