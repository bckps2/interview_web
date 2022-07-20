import { useId, useState } from "react";
import { Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InformationInterview } from "../../Models/InterviewModel";
import { TypeInterView } from "../../Models/TypeInterView";

interface props {
    information: InformationInterview | null
}

export function FormInformation({ information }: props) {

    const readOnly = information !== null;
    const [startDate, setStartDate] = useState(new Date());
    var typeInterviews = Object.keys(TypeInterView);

    return (
        <Col  xs={5}>
            <Form.Label>Entrevistador 1</Form.Label>
            <Form.Control name="entrevistador1" placeholder="Entrevistador 1" required={true} readOnly={readOnly} value={information?.nameInterViewers[0]} />
            <Form.Label>Entrevistador 2</Form.Label>
            <Form.Control name="entrevistador2" placeholder="Entrevistador 2" required={false} readOnly={readOnly} value={information?.nameInterViewers[1]} />
            <Form.Label>Entrevistador 3</Form.Label>
            <Form.Control name="entrevistador3" placeholder="Entrevistador 3" required={false} readOnly={readOnly} value={information?.nameInterViewers[2]} />
            <Form.Label>Tipoe de entrevista</Form.Label>
            <Form.Select disabled={readOnly} name="typeInterView" defaultValue={information?.typeInterView}>
                {typeInterviews.filter((v) => isNaN(Number(v))).map((typeInterview, index) => {
                    return <option value={typeInterview} key={index}>{typeInterview}</option>
                })}
            </Form.Select>
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" placeholder="Email" required={true} readOnly={readOnly} value={information?.email} />
            <Form.Label>Fecha entrevista</Form.Label>
            <DatePicker value={information?.dateInterView.toString()} readOnly={readOnly} name="dateInterview" selected={startDate} onChange={(date) => { if (date) setStartDate(date) }} dateFormat="yyyy-MM-dd" />
            <Form.Label>Observaciones</Form.Label>
            <Form.Control name="observations" placeholder="Observaciones" required={true} readOnly={readOnly} value={information?.observations} />
        </Col>
    )
}



