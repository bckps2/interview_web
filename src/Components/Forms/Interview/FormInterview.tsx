import React from 'react';
import { Form } from 'react-bootstrap';
import { FormInformation } from '../InformationInterview/informationInterview';

export const FormInterview = () => {
    interface props {
        date: Date | null
    }

    return (
        <div>
            <Form.Label>Rango salarial</Form.Label>
            <Form.Control name="rangeSalarial" placeholder="Rango Salarial Ej: 30-35k" required={true} />
            <FormInformation />
        </div>
    );
}