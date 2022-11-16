import { Button, Form } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { InterviewForm } from "../Forms/views/interviewForm";

interface propsProcess {
    idProcess: number,
    submit: any
}

export const ModalInterview = ({ submit, idProcess }: propsProcess) => {

    return (
        <div className="modal fade" data-bs-toggle="modal" data-bs-backdrop="false" id={"interview"+ idProcess + "Modal"} tabIndex={-1} aria-labelledby={"exampleModalLabel"} >
            <div className="modal-dialog" >
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form  onSubmit={submit}>
                            <InterviewForm />
                            <input type="hidden" value={idProcess} name="idProcess" />
                            <Button type="submit">Añadir entrevista </Button>
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
