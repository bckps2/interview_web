import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Process } from "../../../Models/InterviewModel";
import { endpointsProcess } from "../../../Models/Url";
import { deleteProcessState } from "../../../redux/reducers/processSlice";
import { requestDelete } from "../../../Services/RequestService";

interface props {
    process: Process | null,
    idCompany: number,
    companyName: string,
    showButtonDelete: boolean
}

export const ProcessForm = ({ showButtonDelete, process, companyName, idCompany }: props) => {
    
    const dispatch = useDispatch();

    function deleteProcess(event: any, idProcess: number | undefined) {
        if (idProcess) {
            requestDelete(event, endpointsProcess.DeleteProcess, idProcess)
                .then((res: Process) => {
                    if (res) {
                        dispatch(deleteProcessState(res));
                    }
                });
        }
    }

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
            {showButtonDelete &&
                <Button style={{ marginTop: "10px", lineHeight: "20px", marginBottom: "30px" }} type="button" onClick={(e) => deleteProcess(e, process?.idProcess)} className="btn btn-outline-dark">
                Eliminar proceso de selección
            </Button>
            }
        </>
    )
}