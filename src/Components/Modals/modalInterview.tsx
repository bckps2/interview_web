import { Button, Form } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { Interview } from "../../Models/InterviewModel";
import { endpointsInterview } from "../../Models/Url";
import { addInterviewInProcess } from "../../redux/reducers/processSlice";
import { requestAdd } from "../../Services/RequestService";
import { hideModal } from "../../Utils/utilsModal";
import { InterviewForm } from "../Forms/views/interviewForm";

interface propsProcess {
    idProcess: number
}

export const ModalInterview = ({ idProcess }: propsProcess) => {

    const dispatch = useDispatch();

    function submitInterview(e: React.FormEvent<HTMLFormElement>) {
        requestAdd(endpointsInterview.AddInterview, 'interview', e)
            .then((res: Interview) => {
                if (res) {
                    dispatch(addInterviewInProcess(res));
                }
                hideModal("interview" + res.idProcess + "Modal");
            });
    }

    return (
        <div className="modal fade" data-bs-toggle="modal" data-bs-backdrop="false" id={"interview" + idProcess + "Modal"} tabIndex={-1} aria-labelledby={"exampleModalLabel"} >
            <div className="modal-dialog" >
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form onSubmit={submitInterview}>
                            <InterviewForm />
                            <input type="hidden" value={idProcess} name="idProcess" />
                            <Button type="submit">Añadir</Button>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
