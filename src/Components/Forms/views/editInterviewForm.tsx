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
    id:number
}

var typeInterviews = Object.keys(TypeInterView);

export function EditInterview({ interview, id }: props) {

    const [readOnly, setReadOnly] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    
    const [datos, setDatos] = useState({
        name1: interview?.nameInterViewers[0],
        name2: interview?.nameInterViewers[1],
        name3:interview?.nameInterViewers[2],
        observation:interview?.observations,
        email:interview?.email,
        typeInterView:interview?.typeInterView.toString()
    });

    const handleInputChange = (event: React.ChangeEvent<any>) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

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
            <Form>
                <Form.Label>Entrevistador 1</Form.Label>
                <Form.Control name="entrevistador1" placeholder="Entrevistador 1" required={true} readOnly={readOnly} onChange={(e) => handleInputChange(e)} defaultValue={datos.name1} />
                <Form.Label>Entrevistador 2</Form.Label>
                <Form.Control name="entrevistador2" placeholder="Entrevistador 2" required={false} readOnly={readOnly} onChange={(e) => handleInputChange(e)} defaultValue={datos.name2} />
                <Form.Label>Entrevistador 3</Form.Label>
                <Form.Control name="entrevistador3" placeholder="Entrevistador 3" required={false} readOnly={readOnly} onChange={(e) => handleInputChange(e)} defaultValue={datos.name3} />
                <Form.Label>Tipoe de entrevista</Form.Label>
                <Form.Select disabled={readOnly} name="typeInterView" defaultValue={datos.typeInterView} onChange={(e) => handleInputChange(e)}>
                    {typeInterviews.filter((v) => isNaN(Number(v))).map((typeInterview, index) => {
                        return <option selected={datos.typeInterView === typeInterview ? true : false} value={typeInterview} key={index}>{typeInterview}</option>
                    })}
                </Form.Select>
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" placeholder="Email" required={true} readOnly={readOnly} onChange={(e) => handleInputChange(e)} defaultValue={datos.email} />
                <Form.Label>Fecha entrevista</Form.Label>
                <DatePicker value={interview?.dateInterView.toString()} readOnly={readOnly} name="dateInterview" selected={startDate} onChange={(date) => { if (date) setStartDate(date) }} dateFormat="yyyy-MM-dd" />
                <Form.Label>Observaciones</Form.Label>
                <Form.Control name="observations" onChange={(e) => handleInputChange(e)} placeholder="Observaciones" required={true} readOnly={readOnly} defaultValue={datos.observation} />
                <input type="hidden" value={interview?.idInterview} name="idInformation" />
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
                            Eliminar
                        </Button>
                    </span>
            </Form>
        </Col>
    )
}