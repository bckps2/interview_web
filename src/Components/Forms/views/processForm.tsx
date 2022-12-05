import React from 'react';
import { Form } from 'react-bootstrap';
import { Process } from '../../../Models/InterviewModel';
import { GenericModal } from '../../Modals/genericModal';

interface props {
    process: Process | null,
    idCompany: number,
    companyName: string
}

export const ProcessForm = ({ process, companyName, idCompany }: props) => {
    const readOnly = process !== null;

    return (
        <>
            <Form.Label >Nombre Compañia externa</Form.Label>
            <Form.Control name="externalCompany" placeholder="Nombre Compañia externa" required={false} readOnly={readOnly} value={process?.externalCompany} />
            <Form.Label>Rango salarial</Form.Label>
            <Form.Control name="rangeSalarial" placeholder="Rango Salarial Ej: 30-35k" required={true} readOnly={readOnly} value={process?.rangeSalarial} />
            <Form.Label>Puesto de trabajo</Form.Label>
            <Form.Control name="jobPosition" placeholder="Ej: Administrativo, programador.." required={true} readOnly={readOnly} value={process?.jobPosition} />
            <input type="hidden" value={idCompany} name="idCompany"></input>
            <input type="hidden" value={companyName} name="companyName"></input>
        </>
    )
}

interface propsProcess {
    companyName: string,
    idCompany: number,
    action: any
}

export const ModalProcess = ({ companyName, idCompany, action }: propsProcess) => {
    const FormInputs = () => {
        return (
            <ProcessForm process={null} companyName={companyName} idCompany={idCompany} />
        )
    }

    return (
        <GenericModal action={action} FormInputs={FormInputs} headerModal="Proceso de selección" titleButton="Añadir nueva proceso de selccion" />
    )
}

