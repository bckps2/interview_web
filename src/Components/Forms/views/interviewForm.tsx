import { useState } from "react";
import { Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TypeInterView } from "../../../Models/TypeInterView";

var typeInterviews = Object.keys(TypeInterView);

export function InterviewForm() {
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
            <DatePicker name="dateInterview" selected={startDate} onChange={(date) => { if (date) setStartDate(date) }} dateFormat={"dd-MM-yyyy"}/>
            <Form.Label>Observaciones</Form.Label>
            <Form.Control name="observations" placeholder="Observaciones" required={true} />
            <input type="hidden" value={0} name="idInterview" />
        </Col >
    )
}