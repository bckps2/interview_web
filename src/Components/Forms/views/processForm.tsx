import React from 'react';
import { Form } from 'react-bootstrap';
import { Interview } from '../../../Models/InterviewModel';

interface props {
    interview: Interview | null,
    idCompany: number,
    companyName: string
}

export const ProcessForm = ({ interview, companyName, idCompany }: props) => {
    const readOnly = interview !== null;

    return (
        <>
            <Form.Label >Nombre Compañia externa</Form.Label>
            <Form.Control name="externalCompany" placeholder="Nombre Compañia externa" required={false} readOnly={readOnly} value={interview?.externalCompany} />
            <Form.Label>Rango salarial</Form.Label>
            <Form.Control name="rangeSalarial" placeholder="Rango Salarial Ej: 30-35k" required={true} readOnly={readOnly} value={interview?.rangeSalarial} />
            <Form.Label>Puesto de trabajo</Form.Label>
            <Form.Control name="jobPosition" placeholder="Ej: Administrativo, programador.." required={true} readOnly={readOnly} value={interview?.jobPosition} />
            <input type="hidden" value={idCompany} name="idCompany"></input>
            <input type="hidden" value={companyName} name="companyName"></input>
        </>
    )
}