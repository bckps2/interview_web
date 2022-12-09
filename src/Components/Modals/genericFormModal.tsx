import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface props {
    titleButton: string,
    headerModal: string,
    FormInputs: any,
    action: any
}

export const GenericModal = ({ action, FormInputs, titleButton, headerModal }: props) => {

    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button className="btn btn-outline-dark" variant="primary" onClick={handleShow}>
                {titleButton}
            </Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{headerModal}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={action}>
                        <FormInputs />
                        <Button className="btn btn-outline-dark" type="submit" onClick={() => setShow(false)}>Añadir</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}