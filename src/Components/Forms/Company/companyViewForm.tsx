import React, { useId } from "react";
import { Button, Form } from "react-bootstrap";
import { FormInterview } from "../Interview/FormInterview";

interface props {
    action: any;
}

export const CompanyEmptyForm = ({action} : props) => {
    let id = useId();
    return (
        <div> <div className="modal fade" data-bs-backdrop="false" id={"NewCompanyModal"} tabIndex={-1} aria-labelledby={"exampleModalLabel"} aria-hidden="true">
            <div className="modal-dialog" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Recuerda estas añadiendo una empresa nueva</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form key={id} onSubmit={action}>
                            <Form.Label >Nombre Compañia</Form.Label>
                            <Form.Control name="companyName" placeholder="Nombre de compañia" required={true} />
                            <FormInterview />
                            <Button type="submit">Añadir nueva entrevista</Button>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

