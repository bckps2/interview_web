import React from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, Outlet } from "react-router-dom";
import { Company } from '../../Models/InterviewModel';
import { GenericModal } from '../Modals/genericModal';
import './interview.css';

interface props {
    companies: Company[],
    deleteCompany:any,
    addCompany:any
}

export const CompanyCard = ({ companies, deleteCompany,addCompany }: props) => {


    return (
        <div id="cardContainer" className='subBody'>

           <ModalCompany action={addCompany} />

            {companies?.length === undefined &&
                <div><p>Not Found interviews</p></div>
            }
            {companies?.length > 0 &&
                <Row xs={1} md={2} xl={3} className="g-4">
                    {
                        companies?.map((company: Company, index: number) => {
                            return (
                                <div key={"modaldivcompany" + index}>
                                    <Col>
                                        <Card key={"modalcompany" + index}>
                                            <Card.Img variant="top" src="holder.js/100px180" />
                                            <Card.Body>
                                                <Link to={'' + company.idCompany}>
                                                    <Card.Title>{company.companyName}</Card.Title>
                                                </Link>
                                                <Card.Text>
                                                    Fecha de creación : {new Date(company.dateCreated).toLocaleString("es-ES", { dateStyle: 'medium' })}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        <Button type="button" onClick={(e) => deleteCompany(e, company.idCompany)}>
                                           Eliminar company
                                        </Button>
                                    </Col>
                                    <Outlet />
                                </div>)
                        })
                    }
                </Row>
            }
        </div>
    )
}

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
