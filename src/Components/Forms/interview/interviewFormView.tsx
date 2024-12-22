import { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { endpointsInterview } from "../../../Models/Url";
import { Interview } from "../../../Models/InterviewModel";
import { TypeInterView } from "../../../Models/TypeInterView";
import { requestDelete, requestUpdate } from "../../../Services/RequestService";
import "react-datepicker/dist/react-datepicker.css";
import { deleteInterviewState, updateStateInterview } from "../../../Core/Redux/Reducers/ProcessSlice";

interface propsEdit {
    interview: Interview | null,
    showEdiButtons: boolean
}

var typeInterviews = Object.keys(TypeInterView);

export function InterviewEdit({ interview, showEdiButtons }: propsEdit) {

    const dispatch = useDispatch();
    const [readOnly, setReadOnly] = useState(true);

    const setStateInterview = (interview: Interview | null) => {
        setDatos({
            ...datos,
            email: interview?.email,
            entrevistador1: interview?.nameInterViewers[0],
            entrevistador2: interview?.nameInterViewers[1],
            entrevistador3: interview?.nameInterViewers[2],
            observation: interview?.observations,
            typeInterView: interview?.typeInterView.toString(),
            dateInterview: interview?.dateInterView
        });
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

    function updateInterview(event: any) {
        requestUpdate(endpointsInterview.UpdateInterview, 'interview', event)
            .then((res: Interview) => {
                if (res) {
                    setReadOnly(true);
                    dispatch(updateStateInterview(res));
                    setStateInterview(res);
                }
            });
    }

    return (
        <div>
            <Form onSubmit={updateInterview}>
                <InterviewForm setReadOnly={setReadOnly} interview={interview} readOnly={readOnly} showEdiButtons={showEdiButtons} />
            </Form>
        </div>
    )
}

interface propsForm {
    interview: Interview | null,
    showEdiButtons: boolean,
    readOnly: boolean,
    setReadOnly:any
}

export function InterviewForm({ interview, showEdiButtons, readOnly, setReadOnly }: propsForm) {

    const [startDate, setStartDate] = useState(interview?.dateInterView ?? new Date());
    const dispatch = useDispatch();

    const [datos, setDatos] = useState({
        entrevistador1: interview?.nameInterViewers[0],
        entrevistador2: interview?.nameInterViewers[1],
        entrevistador3: interview?.nameInterViewers[2],
        observation: interview?.observations,
        email: interview?.email,
        typeInterView: interview?.typeInterView.toString(),
        dateInterview: interview?.dateInterView
    });

    const handleInputChange = (event: any) => {
        event.preventDefault();
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const setStateInterview = (interview: Interview | null) => {
        setDatos({
            ...datos,
            email: interview?.email,
            entrevistador1: interview?.nameInterViewers[0],
            entrevistador2: interview?.nameInterViewers[1],
            entrevistador3: interview?.nameInterViewers[2],
            observation: interview?.observations,
            typeInterView: interview?.typeInterView.toString(),
            dateInterview: interview?.dateInterView
        });
    }

    function cancelUpdate(event: any) {
        event.preventDefault();
        setStateInterview(interview);
        setStartDate(interview?.dateInterView ?? new Date());
        setReadOnly(true);
    }

    function deleteInterview(event: any, idInterview: number | undefined) {
        if (idInterview) {
            requestDelete(event, endpointsInterview.DeleteInterview, idInterview)
                .then((res: Interview) => {
                    if (res) {
                        dispatch(deleteInterviewState(res));
                        setReadOnly(true);
                    }
                });
        }
    }

    return (
        <div>
            <Form.Label>Entrevistador 1</Form.Label>
            <Form.Control name="entrevistador1" placeholder="Entrevistador 1" required={true} readOnly={readOnly} onChange={(e) => handleInputChange(e)} value={datos.entrevistador1 || ''} />
            <Form.Label>Entrevistador 2</Form.Label>
            <Form.Control name="entrevistador2" placeholder="Entrevistador 2" required={false} readOnly={readOnly} onChange={(e) => handleInputChange(e)} value={datos.entrevistador2 || ''} />
            <Form.Label>Entrevistador 3</Form.Label>
            <Form.Control name="entrevistador3" placeholder="Entrevistador 3" required={false} readOnly={readOnly} onChange={(e) => handleInputChange(e)} defaultValue={datos.entrevistador3 || ''} />
            <Form.Label>Tipoe de entrevista</Form.Label>
            <Form.Select disabled={readOnly} name="typeInterView" value={datos.typeInterView || typeInterviews[0]} onChange={(e) => handleInputChange(e)}>
                {typeInterviews.filter((v) => isNaN(Number(v))).map((typeInterview, index) => {
                    return <option value={typeInterview} key={index}>{typeInterview}</option>
                })}
            </Form.Select>
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" placeholder="Email" required={true} readOnly={readOnly} onChange={(e) => handleInputChange(e)} defaultValue={datos.email || ''} />
            <Form.Label>Fecha entrevista</Form.Label>
            <DatePicker dateFormat={"dd-MM-yyyy"} readOnly={readOnly} selected={new Date(startDate)} onSelect={(date) => setStartDate(date!)} name="dateInterview" onChange={(date) => { if (date) setStartDate(date) }} />
            <Form.Label>Observaciones</Form.Label>
            <Form.Control name="observations" onChange={(e) => handleInputChange(e)} placeholder="Observaciones" required={true} readOnly={readOnly} defaultValue={datos.observation || ''} />
            <input type="hidden" value={interview?.idInterview ?? 0} name="idInterview" />
            {
                showEdiButtons &&
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
            }
        </div>

    )
}