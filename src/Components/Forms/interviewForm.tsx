import React from 'react';
import { Form } from 'react-bootstrap';
import { FormInformation } from './informationInterview';

export const FormInterview = () => {
    return (
        <div>
            <Form.Label>Rango salarial</Form.Label>
            <Form.Control name="rangeSalarial" placeholder="Rango Salarial Ej: 30-35k" required={true} />
            <FormInformation />
        </div>
    );
}