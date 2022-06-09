import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { TypeInterView } from '../../../Models/TypeInterView';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormInterViewInformation = () => {

    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className="form-register">
            <Col xs={5}>
                <Form.Label>Entrevistador 1</Form.Label>
                <Form.Control name="entrevistador1" placeholder="Entrevistador 1" required={true} />
                <Form.Label>Entrevistador 2</Form.Label>
                <Form.Control name="entrevistador2" placeholder="Entrevistador 2" required={false} />
                <Form.Label>Entrevistador 3</Form.Label>
                <Form.Control name="entrevistador3" placeholder="Entrevistador 3" required={false} />
                <Form.Label>Tipoe de entrevista</Form.Label>
                <Form.Select name="typeInterView" >
                    <option value=" "></option>
                    {

                        TypeInterView.map((type, value) => {
                            return (
                                <option value={type.value} key={value}>{type.label}</option>
                            )
                        })
                    }
                </Form.Select>
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" placeholder="Email" required={true} />
                <Form.Label>Selecciona fecha de entrevista</Form.Label>
                <DatePicker name="dateInterView" selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd" />

            </Col>
        </div>
    );
}

export default FormInterViewInformation