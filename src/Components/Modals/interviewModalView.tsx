import { useDispatch } from "react-redux";
import { Interview, ValueResponse } from "../../Models/InterviewModel";
import { endpointsInterview } from "../../Models/Url";
import { addInterviewInProcess } from "../../redux/reducers/processSlice";
import { requestAdd } from "../../Services/RequestService";
import { GenericModal } from "./genericFormModal";
import { InterviewForm } from "../Forms/interviewFormView";

interface propsInterviewModal {
    idProcess: number
}

export const ModalInterview = ({ idProcess }: propsInterviewModal) => {

    const dispatch = useDispatch();

    function submitInterview(e: React.FormEvent<HTMLFormElement>) {
        requestAdd(endpointsInterview.AddInterview, 'interview', e)
            .then((res: ValueResponse<Interview>) => {
                if (res) {
                    dispatch(addInterviewInProcess(res.value));
                }
            });
    }

    const FormInputs = () => {
        return (
            <span>
                <InterviewForm idProcess={idProcess} interview={null} showEdiButtons={false} readOnly={false} setReadOnly={null}/>
            </span>
        )
    }

    return (
        <GenericModal action={submitInterview} FormInputs={FormInputs} headerModal="Nueva entrevista" titleButton="Añadir nueva entrevista" />
    )
}