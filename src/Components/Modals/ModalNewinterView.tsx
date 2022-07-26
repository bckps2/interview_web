import { Button, Form, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TypeInterView } from "../../Models/TypeInterView";
import { useState } from "react";

interface propsProcess {
    companyName: string,
    idInterview: number,
    submit: (e: React.FormEvent<HTMLFormElement>) => void
}

var typeInterviews = Object.keys(TypeInterView);

export const NewInterViewProcessSelection = ({ companyName, submit, idInterview }: propsProcess) => {

    return (
        <div className="modal fade" data-bs-toggle="modal" data-bs-backdrop="false" id={"interview"+ idInterview + companyName + "Modal"} tabIndex={-1} aria-labelledby={"exampleModalLabel"} >
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
                            <AddNewInformation />
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

function AddNewInformation() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <Col xs={5}>
            <Form.Label>Entrevistador 1</Form.Label>
            <Form.Control name="entrevistador1" placeholder="Entrevistador 1" required={true} />
            <Form.Label>Entrevistador 2</Form.Label>
            <Form.Control name="entrevistador2" placeholder="Entrevistador 2" required={false} />
            <Form.Label>Entrevistador 3</Form.Label>
            <Form.Control name="entrevistador3" placeholder="Entrevistador 3" required={false} />
            <Form.Label>Tipoe de entrevista</Form.Label>
            <Form.Select name="typeInterView" >
                {typeInterviews.filter((v) => isNaN(Number(v))).map((typeInterview, index) => {
                    return <option value={typeInterview} key={index}>{typeInterview}</option>
                })}
            </Form.Select>
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" placeholder="Email" required={true} />
            <Form.Label>Fecha entrevista</Form.Label>
            <DatePicker name="dateInterview" selected={startDate} onChange={(date) => { if (date) setStartDate(date) }} dateFormat="yyyy-MM-dd" />
            <Form.Label>Observaciones</Form.Label>
            <Form.Control name="observations" placeholder="Observaciones" required={true} />
            <input type="hidden" value={0} name="idInformation" />
        </Col>
    )
}
