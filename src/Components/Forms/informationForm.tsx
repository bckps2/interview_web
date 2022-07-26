import { resolve } from "node:path/win32";
import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Company, InformationInterview } from "../../Models/InterviewModel";
import { TypeInterView } from "../../Models/TypeInterView";
import { setupdateInformation } from "../../redux/reducers/interviewSlice";
import { updateInterviewInformation } from "../../Services/RequestService";

interface props {
    information: InformationInterview | null,
    showButton: boolean,
    deleteInformation: any
}

var typeInterviews = Object.keys(TypeInterView);

export function AddNewInformation() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <Col xs={5}>
            <Form.Label>Entrevistador 1</Form.Label>
            <Form.Control name="entrevistador1" placeholder="Entrevistador 1" required={true} />
            <Form.Label>Entrevistador 2</Form.Label>
            <Form.Control name="entrevistador2" placeholder="Entrevistador 2" required={false} />
            <Form.Label>Entrevistador 3</Form.Label>
            <Form.Control name="entrevistador3" placeholder="Entrevistador 3" required={false} />
            <Form.Label>Tipoe de entrevista</Form.Label>
            <Form.Select name="typeInterView" >
                {typeInterviews.filter((v) => isNaN(Number(v))).map((typeInterview, index) => {
                    return <option value={typeInterview} key={index}>{typeInterview}</option>
                })}
            </Form.Select>
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" placeholder="Email" required={true} />
            <Form.Label>Fecha entrevista</Form.Label>
            <DatePicker name="dateInterview" selected={startDate} onChange={(date) => { if (date) setStartDate(date) }} dateFormat="yyyy-MM-dd" />
            <Form.Label>Observaciones</Form.Label>
            <Form.Control name="observations" placeholder="Observaciones" required={true} />
            <input type="hidden" value={0} name="idInformation" />
        </Col >
    )
}

export function EditInformation({ information, showButton, deleteInformation }: props) {

    const [infor, setInformation] = useState(information);
    const [readOnly, setReadOnly] = useState(showButton);
    const [startDate, setStartDate] = useState(new Date());
    const [valueName1, setValueName1] = useState(infor?.nameInterViewers[0]);
    const [valueName2, setValueName2] = useState(infor?.nameInterViewers[1]);
    const [valueName3, setValueName3] = useState(infor?.nameInterViewers[2]);
    const [observation, setObservation] = useState(infor?.observations);
    const [email, setEmail] = useState(infor?.email);
    const [typeInterView, setTypeInterview] = useState(infor?.typeInterView.toString());

    function updateInformation(event: any) {
        updateInterviewInformation(event).then((response) => {
            if (response.idInformation) {
                let companySession = sessionStorage.getItem('company');
                if (companySession) {
                    let company = JSON.parse(companySession) as Company;

                    company.interViews.forEach((interview) => {
                        if (interview.idInterView === response.interViewIdInterView) {
                            interview.informationInterViews.forEach((information) => {
                                if (information.idInformation === response.idInformation) {
                                    information.typeInterView = response.typeInterView;
                                    information.email = response.email;
                                    information.dateInterView = response.dateInterView;
                                    information.nameInterViewers = response.nameInterViewers;
                                    information.observations = response.observations;
                                }
                            })
                        }
                    });

                    sessionStorage.setItem('company', JSON.stringify(company));
                    setInformation(response);
                }
            }
        }).finally(() => setReadOnly(true))
    }

    return (
        <Col xs={5}>
            <Form onSubmit={updateInformation}>
                <Form.Label>Entrevistador 1</Form.Label>
                <Form.Control name="entrevistador1" placeholder="Entrevistador 1" required={true} readOnly={readOnly} onChange={(e) => setValueName1(e.target.value)} defaultValue={valueName1} />
                <Form.Label>Entrevistador 2</Form.Label>
                <Form.Control name="entrevistador2" placeholder="Entrevistador 2" required={false} readOnly={readOnly} onChange={(e) => setValueName2(e.target.value)} defaultValue={valueName2} />
                <Form.Label>Entrevistador 3</Form.Label>
                <Form.Control name="entrevistador3" placeholder="Entrevistador 3" required={false} readOnly={readOnly} onChange={(e) => setValueName3(e.target.value)} defaultValue={valueName3} />
                <Form.Label>Tipoe de entrevista</Form.Label>
                <Form.Select disabled={readOnly} name="typeInterView" defaultValue={typeInterView} onChange={(e) => setTypeInterview(e.target.value)}>
                    {typeInterviews.filter((v) => isNaN(Number(v))).map((typeInterview, index) => {
                        return <option selected={typeInterView == typeInterview ? true : false} value={typeInterview} key={index}>{typeInterview}</option>
                    })}
                </Form.Select>
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" placeholder="Email" required={true} readOnly={readOnly} onChange={(e) => setEmail(e.target.value)} defaultValue={email} />
                <Form.Label>Fecha entrevista</Form.Label>
                <DatePicker value={information?.dateInterView.toString()} readOnly={readOnly} name="dateInterview" selected={startDate} onChange={(date) => { if (date) setStartDate(date) }} dateFormat="yyyy-MM-dd" />
                <Form.Label>Observaciones</Form.Label>
                <Form.Control name="observations" onChange={(e) => setObservation(e.target.value)} placeholder="Observaciones" required={true} readOnly={readOnly} defaultValue={observation} />
                <input type="hidden" value={information?.idInformation} name="idInformation" />
                {showButton &&
                    <span>
                        <Button type="button" onClick={(e) => setReadOnly(false)} className="btn btn-outline-dark">
                            Editar entrevista
                        </Button>
                        <Button type="button" onClick={(e) => setReadOnly(true)} className="btn btn-outline-dark">
                            Cancelar
                        </Button>
                        <Button type="submit" className="btn btn-outline-dark">
                            Update information
                        </Button>
                        <Button type="button" onClick={(e) => deleteInformation(e, information?.idInformation)} className="btn btn-outline-dark">
                            Eliminar entrevista
                        </Button>
                    </span>
                }
            </Form>
        </Col>
    )
}