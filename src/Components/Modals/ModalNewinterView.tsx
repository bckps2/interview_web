import { useId } from "react";
import { Button, Form } from "react-bootstrap";
import { FormInformation } from "../Forms/informationForm";

interface propsProcess {
    companyName: string,
    idInterview: number,
    submit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const NewInterViewProcessSelection = ({ companyName, submit, idInterview }: propsProcess) => {

    return (
        <div className="modal fade" data-bs-backdrop="false" id={"interview"+ idInterview + companyName + "Modal"} tabIndex={-1} aria-labelledby={"exampleModalLabel"} >
            <div className="modal-dialog" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Recuerda estas añadiendo una entrevista en este proceso de selección en la empresa {companyName}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form  onSubmit={submit}>
                            <FormInformation information={null}/>
                            <input type="hidden" value={idInterview} name="idInterview"></input>
                            <input type="hidden" value={companyName} name="companyName"></input>
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
