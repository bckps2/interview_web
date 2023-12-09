import { Form } from "react-bootstrap"
import { GenericModal } from "./genericFormModal"

interface propsCompany {
    action: any
}

export const ModalCompany = ({ action }: propsCompany) => {
    const FormInputs = () => {
        return (
            <span>
                <Form.Label >Nombre Compañia</Form.Label>
                <Form.Control name="companyName" placeholder="Nombre de compañia" required={true} />
            </span>
        )
    }

    return (
        <div>
            <GenericModal action={action} FormInputs={FormInputs} headerModal="Nueva compañia" titleButton="Añadir nueva compañia" />
        </div>
    )
}