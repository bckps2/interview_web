import React from 'react';
import { Form } from 'react-bootstrap';
import { Interview } from '../../Models/InterviewModel';
import { FormInformation } from './informationForm';

interface props{
    interview: Interview | null
}

export const FormInterview = ({interview} : props) => {
    const readOnly = interview !== null;

    return (
        <div>
            <Form.Label >Nombre Compañia externa</Form.Label>
            <Form.Control name="externalCompany" placeholder="Nombre Compañia externa" required={false} readOnly={readOnly} value={interview?.externalCompany}/>
            <Form.Label>Rango salarial</Form.Label>
            <Form.Control name="rangeSalarial" placeholder="Rango Salarial Ej: 30-35k" required={true} readOnly={readOnly} value={interview?.rangeSalarial}/>
            <Form.Label>Puesto de trabajo</Form.Label>
            <Form.Control name="jobPosition" placeholder="Ej: Administrativo, programador.." required={true} readOnly={readOnly} value={interview?.jobPosition}/>
        </div>
    );
}