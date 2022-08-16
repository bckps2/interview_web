import { Button, Form } from "react-bootstrap";
import { ProcessForm } from "../Forms/views/processForm";

interface propsProcess {
    companyName: string,
    idCompany: number,
    submit: any
}

export const NewProcessSelection = ({ companyName, submit, idCompany }: propsProcess) => {
    return (
        <div className="modal fade" data-bs-toggle="modal" data-bs-backdrop="false" id={"processSelectionModal"} tabIndex={-1} aria-labelledby={"exampleModalLabel"} aria-hidden="true">
            <div className="modal-dialog" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Recuerda estas añadiendo un nuevo proceso de selección en la empresa {companyName}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form onSubmit={submit}>
                            <ProcessForm process={null} companyName={companyName} idCompany={idCompany} />
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
