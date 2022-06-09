import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import FormInterViewInformation from './InformationInterView';

const FormInterView = (props) => {

    return (
        <div className="form-register">
            <Form onSubmit={props.data.handleSubmit} >
                <Col xs={3}>
                    <Form.Label>Nombre Compañia</Form.Label>
                    <Form.Control name="company" placeholder="Nombre de compañia" required={true} />
                    <Form.Label>Rango salarial</Form.Label>
                    <Form.Control name="rangeSalarial" placeholder="Rango Salarial Ej: 30-35k" required={true} />
                    <FormInterViewInformation />
                </Col>

                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default FormInterView