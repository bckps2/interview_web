import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Interview } from "../../../Models/InterviewModel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TypeInterView } from "../../../Models/TypeInterView";
import { requestDelete, requestUpdate } from "../../../Services/RequestService";
import { useDispatch } from "react-redux";
import { deleteInterviewState, updateStateInterview } from "../../../redux/reducers/processSlice";
import { endpointsInterview } from "../../../Models/Url";

interface props {
    interview: Interview,
    id: number
}

var typeInterviews = Object.keys(TypeInterView);

export function EditInterview({ interview, id }: props) {

    const dispatch = useDispatch();
    const [readOnly, setReadOnly] = useState(true);
    const [startDate, setStartDate] = useState(interview.dateInterView);
    
    const handleInputChange = (event: any) => {
        event.preventDefault();
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const [datos, setDatos] = useState({
        entrevistador1: interview?.nameInterViewers[0],
        entrevistador2: interview?.nameInterViewers[1],
        entrevistador3: interview?.nameInterViewers[2],
        observation: interview?.observations,
        email: interview?.email,
        typeInterView: interview?.typeInterView.toString(),
        dateInterview: interview?.dateInterView
    });

    const setStateInterview = (interview : Interview) =>{
        setDatos({
            ...datos,
            email: interview.email,
            entrevistador1: interview.nameInterViewers[0],
            entrevistador2: interview.nameInterViewers[1],
            entrevistador3: interview.nameInterViewers[2],
            observation: interview.observations,
            typeInterView: interview.typeInterView.toString(),
            dateInterview: interview.dateInterView
        });
    }

    function deleteInterview(event: any, idInterview: number | undefined) {
        if (idInterview) {
            requestDelete(event, endpointsInterview.DeleteInterview, idInterview)
                .then((res: Interview) => {
                    if (res) {
                        dispatch(deleteInterviewState(res));
                    }
                });
        }
    }

    function cancelUpdate(event: any) {
        event.preventDefault();
        setStateInterview(interview);
        setStartDate(interview?.dateInterView);
        setReadOnly(true);
    }

    function updateInterview(event: any) {
        requestUpdate(endpointsInterview.UpdateInterview, 'interview', event)
            .then((res: Interview) => {
                if (res) {
                    dispatch(updateStateInterview(res));
                    setStateInterview(res);
                    setReadOnly(true);
                }
            });
    }

    return (
        <Col xs={5}>
            <Form onSubmit={updateInterview}>
                <Form.Label>Entrevistador 1</Form.Label>
                <Form.Control name="entrevistador1" placeholder="Entrevistador 1" required={true} readOnly={readOnly} onChange={(e) => handleInputChange(e)} value={datos.entrevistador1} />
                <Form.Label>Entrevistador 2</Form.Label>
                <Form.Control name="entrevistador2" placeholder="Entrevistador 2" required={false} readOnly={readOnly} onChange={(e) => handleInputChange(e)} value={datos.entrevistador2} />
                <Form.Label>Entrevistador 3</Form.Label>
                <Form.Control name="entrevistador3" placeholder="Entrevistador 3" required={false} readOnly={readOnly} onChange={(e) => handleInputChange(e)} defaultValue={datos.entrevistador3} />
                <Form.Label>Tipoe de entrevista</Form.Label>
                <Form.Select disabled={readOnly} name="typeInterView" value={datos.typeInterView} onChange={(e) => handleInputChange(e)}>
                    {typeInterviews.filter((v) => isNaN(Number(v))).map((typeInterview, index) => {
                        return <option value={typeInterview} key={index}>{typeInterview}</option>
                    })}
                </Form.Select>
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" placeholder="Email" required={true} readOnly={readOnly} onChange={(e) => handleInputChange(e)} defaultValue={datos.email} />
                <Form.Label>Fecha entrevista</Form.Label>
                <DatePicker dateFormat={"dd-MM-yyyy"} readOnly={readOnly} selected={new Date(startDate)} onSelect={(date) => setStartDate(date)} name="dateInterview" onChange={(date) => { if (date) setStartDate(date) }} />
                <Form.Label>Observaciones</Form.Label>
                <Form.Control name="observations" onChange={(e) => handleInputChange(e)} placeholder="Observaciones" required={true} readOnly={readOnly} defaultValue={datos.observation} />
                <input type="hidden" value={interview?.idInterview} name="idInterview" />
                <input type="hidden" value={interview?.idProcess} name="idProcess" />
                <span>
                    <Button type="button" style={readOnly ? { display: "inline" } : { display: "none" }} onClick={(e) => setReadOnly(false)} className="btn btn-outline-dark">
                        Editar entrevista
                    </Button>
                    <Button type="button" onClick={(e) => cancelUpdate(e)} style={readOnly ? { display: "none" } : { display: "inline" }} className={"btn btn-outline-dark"}>
                        Cancelar
                    </Button>
                    <Button type="submit" style={readOnly ? { display: "none" } : { display: "inline" }} className="btn btn-outline-dark">
                        Update information
                    </Button>
                    <Button type="button" style={readOnly ? { display: "none" } : { display: "inline" }} onClick={(e) => deleteInterview(e, interview?.idInterview)} className="btn btn-outline-dark">
                        Eliminar
                    </Button>
                </span>
            </Form>
        </Col>
    )
}