import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link, Outlet } from "react-router-dom";
import { Company } from '../../Models/InterviewModel';

interface props {
    companies : Company[]
}

export const CompanyCard = ({companies}: props) => {
    return (
        <div>
            {
                companies.map((company: Company) => {
                    return (
                        <div>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Link to={'' + company.idCompany} state={company} >
                                        <Card.Title>{company.companyName}</Card.Title>
                                    </Link>
                                    <Card.Text>
                                        <p>{company.dateCreated.toString()}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Outlet />
                        </div>)
                })
            }
        </div>

    );
}