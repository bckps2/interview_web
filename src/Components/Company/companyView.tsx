import React from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, Outlet } from "react-router-dom";
import { Company } from '../../Models/InterviewModel';
import { GenericModal } from '../Modals/genericFormModal';
import { AddNewCompany, AllCompanies, deleteCompany } from "../../redux/reducers/companySlice";
import { useEffect } from "react";
import { endpointsCompany } from "../../Models/Url";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../redux/store/store';
import { GetAll, requestAdd, requestDelete } from '../../Services/RequestService';
import './company.css';

export const CompanyView = () => {

    const dispatch = useDispatch();
    const companySlice = useSelector((state: RootState) => state.companySlice);

    useEffect(() => {
        if (!companySlice.companies.length) {
            GetAll(endpointsCompany.GetAllCompanies)
                .then((res: Company[]) => {
                    dispatch(AllCompanies(res))
                })
        }
    }, [dispatch,companySlice]);
    
    function deleteCompanyInterview(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, idCompany:number){
        requestDelete(e, endpointsCompany.DeleteCompany, idCompany)
            .then((res: Company) => {
                if(res){
                    dispatch(deleteCompany(res));
                }
            });
    }

    function submitCompany(e: React.FormEvent<HTMLFormElement>) {
        requestAdd(endpointsCompany.AddCompany, 'company', e)
            .then((res: Company) => {
                if (res) {
                    dispatch(AddNewCompany(res));
                }
            })
    }

    return (
        <div id="cardContainer" className='subBody'>

           <ModalCompany action={submitCompany} />

            {companySlice.companies?.length === undefined &&
                <div><p>Not Found interviews</p></div>
            }
            {companySlice.companies?.length > 0 &&
                <Row xs={1} md={2} xl={3} className="g-4">
                    {
                        companySlice.companies?.map((company: Company, index: number) => {
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
                                        <Button type="button" onClick={(e) => deleteCompanyInterview(e, company?.idCompany)}>
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
