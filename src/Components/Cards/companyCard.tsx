import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link, Outlet } from "react-router-dom";
import { Company } from '../../Models/InterviewModel';
import { CompanyEmptyForm } from '../Forms/companyForm';
import './interview.css';

interface props {
    companies: Company[],
    submit: any
}

export const CompanyCard = ({ companies, submit }: props) => {

    return (
        <div id="cardContainer" className='subBody'>

            <Button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target={"#NewCompanyModal"}>
                Añade nueva entrevista con otra empresa
            </Button>
            <CompanyEmptyForm action={submit} />
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
                                                <Link to={'' + company.idCompany} state={company} >
                                                    <Card.Title>{company.companyName}</Card.Title>
                                                </Link>
                                                <Card.Text>
                                                    Fecha de creación : {new Date(company.dateCreated).toLocaleString("es-ES", { dateStyle: 'medium' })}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
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