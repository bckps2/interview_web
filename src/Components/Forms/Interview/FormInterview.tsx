import React from 'react';
import { Form } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { FormLabelInformation } from '../InformationInterview/informationInterview';

interface props {
    idCompany: number
}

export const FormInterview = ({ idCompany }: props) => {
    return (
        <div>
            <Form.Label>Rango salarial</Form.Label>
            <Form.Control name="rangeSalarial" placeholder="Rango Salarial Ej: 30-35k" required={true} />
            <FormLabelInformation />
            <input type="hidden" value={idCompany} defaultValue={idCompany} name="idCompany"></input>
        </div>
    );
}

// const FormInformationInterView = () => {

//     const [startDate, setStartDate] = useState(new Date());

//     return (
//         <div className="form-register">
//             <Col xs={5}>
//                 <Form.Label>Entrevistador 1</Form.Label>
//                 <Form.Control name="entrevistador1" placeholder="Entrevistador 1" required={true} />
//                 <Form.Label>Entrevistador 2</Form.Label>
//                 <Form.Control name="entrevistador2" placeholder="Entrevistador 2" required={false} />
//                 <Form.Label>Entrevistador 3</Form.Label>
//                 <Form.Control name="entrevistador3" placeholder="Entrevistador 3" required={false} />
//                 <Form.Label>Tipoe de entrevista</Form.Label>
//                 <Form.Select name="typeInterView" >
//                     <option value=" "></option>
//                     {

//                         TypeInterView.map((type, value) => {
//                             return (
//                                 <option value={type.value} key={value}>{type.label}</option>
//                             )
//                         })
//                     }
//                 </Form.Select>
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control name="email" placeholder="Email" required={true} />
//                 <Form.Label>Selecciona fecha de entrevista</Form.Label>
//                 <DatePicker name="dateInterView" selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd" />
//                 <Form.Label>Observaciones</Form.Label>
//                 <Form.Control name="observations" placeholder="Observaciones" required={true} />
//             </Col>
//         </div>
//     );
// }
