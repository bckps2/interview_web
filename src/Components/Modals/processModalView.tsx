import { GenericModal } from "./genericFormModal"
import { ProcessForm } from "../Forms/processFormView"
import { requestAdd } from "../../Services/RequestService";
import { endpointsProcess } from "../../Models/Url";
import { Process, ValueResponse } from "../../Models/InterviewModel";
import { addProcessState } from "../../redux/reducers/processSlice";
import { useDispatch } from "react-redux";

interface propsProcess<T> {
    companyName: string,
    idCompany: number
}

export const ModalProcess = ({ companyName, idCompany }: propsProcess<any>) => {

    const dispatch = useDispatch();

    function submitProcess(e: React.FormEvent<HTMLFormElement>) {
        requestAdd(endpointsProcess.AddProcess, 'process', e)
            .then((res: ValueResponse<Process>) => {
                if (res) {
                    dispatch(addProcessState(res.value));
                }
            });
    }

    const FormInputs = () => {
        return (
            <ProcessForm showButtonDelete={false} process={null} companyName={companyName} idCompany={idCompany} />
        )
    }

    return (
        <GenericModal action={submitProcess} FormInputs={FormInputs} headerModal="Proceso de selección" titleButton="Añadir nueva proceso de seleccion" />
    )
}
