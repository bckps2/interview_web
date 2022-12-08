import { GenericModal } from "../../Modals/genericFormModal"
import { ProcessForm } from "./processFormView"

interface propsProcess<T> {
    companyName: string,
    idCompany: number,
    action: T
}

export const ModalProcess = ({ companyName, idCompany, action }: propsProcess<any>) => {

    const FormInputs = () => {
        return (
            <ProcessForm process={null} companyName={companyName} idCompany={idCompany} />
        )
    }

    return (
        <GenericModal action={action} FormInputs={FormInputs} headerModal="Proceso de selección" titleButton="Añadir nueva proceso de selccion" />
    )
}