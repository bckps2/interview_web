import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Interview } from "../../../Models/InterviewModel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TypeInterView } from "../../../Models/TypeInterView";
import { deleteInterview } from "../../../Services/RequestService";
import { useDispatch } from "react-redux";
import { deleteInterviewState } from "../../../redux/reducers/processSlice";

interface props {
    interview: Interview | null,
    showButton: boolean,
    id:number
}

var typeInterviews = Object.keys(TypeInterView);

export function EditInterview({ interview, showButton, id }: props) {

    const [infor, setInformation] = useState(interview);
    const [readOnly, setReadOnly] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [valueName1, setValueName1] = useState(infor?.nameInterViewers[0]);
    const [valueName2, setValueName2] = useState(infor?.nameInterViewers[1]);
    const [valueName3, setValueName3] = useState(infor?.nameInterViewers[2]);
    const [observation, setObservation] = useState(infor?.observations);
    const [email, setEmail] = useState(infor?.email);
    const [typeInterView, setTypeInterview] = useState(infor?.typeInterView.toString());

    const dispatch = useDispatch();
    
    function deleteInterviewProcess(event: any, idInterview: number | undefined) {
        event.preventDefault();
        if(idInterview){
            deleteInterview(idInterview)
            .then((res: Interview) => {
                dispatch(deleteInterviewState(res));
            });
        }
    }

    return (
        <Col xs={5}>
            <Form >
                <Form.Label>Entrevistador 1</Form.Label>
                <Form.Control name="entrevistador1" placeholder="Entrevistador 1" required={true} readOnly={readOnly} onChange={(e) => setValueName1(e.target.value)} defaultValue={valueName1} />
                <Form.Label>Entrevistador 2</Form.Label>
                <Form.Control name="entrevistador2" placeholder="Entrevistador 2" required={false} readOnly={readOnly} onChange={(e) => setValueName2(e.target.value)} defaultValue={valueName2} />
                <Form.Label>Entrevistador 3</Form.Label>
                <Form.Control name="entrevistador3" placeholder="Entrevistador 3" required={false} readOnly={readOnly} onChange={(e) => setValueName3(e.target.value)} defaultValue={valueName3} />
                <Form.Label>Tipoe de entrevista</Form.Label>
                <Form.Select disabled={readOnly} name="typeInterView" defaultValue={typeInterView} onChange={(e) => setTypeInterview(e.target.value)}>
                    {typeInterviews.filter((v) => isNaN(Number(v))).map((typeInterview, index) => {
                        return <option selected={typeInterView === typeInterview ? true : false} value={typeInterview} key={index}>{typeInterview}</option>
                    })}
                </Form.Select>
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" placeholder="Email" required={true} readOnly={readOnly} onChange={(e) => setEmail(e.target.value)} defaultValue={email} />
                <Form.Label>Fecha entrevista</Form.Label>
                <DatePicker value={interview?.dateInterView.toString()} readOnly={readOnly} name="dateInterview" selected={startDate} onChange={(date) => { if (date) setStartDate(date) }} dateFormat="yyyy-MM-dd" />
                <Form.Label>Observaciones</Form.Label>
                <Form.Control name="observations" onChange={(e) => setObservation(e.target.value)} placeholder="Observaciones" required={true} readOnly={readOnly} defaultValue={observation} />
                <input type="hidden" value={interview?.idInterview} name="idInformation" />
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
                        <Button type="button" onClick={(e) => deleteInterviewProcess(e, interview?.idInterview)} className="btn btn-outline-dark">
                            Eliminar entrevista numero  {interview?.idInterview}
                        </Button>
                    </span>
                }
            </Form>
        </Col>
    )
}