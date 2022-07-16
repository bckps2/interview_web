import { useId } from "react";
import { Col, Form } from "react-bootstrap";

interface propsForm {
    action: any
}

export function FormInformation({action} : propsForm) {
    let id = useId();
    
    return (
        <Col key={id} xs={5}>
            <Form.Label>Entrevistador 1</Form.Label>
            <Form.Control name="entrevistador1" placeholder="Entrevistador 1" required={true} />
            <Form.Label>Entrevistador 2</Form.Label>
            <Form.Control name="entrevistador2" placeholder="Entrevistador 2" required={false} />
            <Form.Label>Entrevistador 3</Form.Label>
            <Form.Control name="entrevistador3" placeholder="Entrevistador 3" required={false} />
            <Form.Label>Tipoe de entrevista</Form.Label>
            <Form.Select name="typeInterView" >
                {/* <option value={}></option> */}
            </Form.Select>
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" placeholder="Email" required={true} />
            {/* <Form.Label>Selecciona fecha de entrevista</Form.Label>
            <DatePicker name="dateInterView" selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd" />  */}
            <Form.Label>Observaciones</Form.Label>
            <Form.Control name="observations" placeholder="Observaciones" required={true} />
        </Col>
    )
}



