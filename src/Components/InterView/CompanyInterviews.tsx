import { ListGroup } from "react-bootstrap";
import { Company } from "../../Models/InterviewModel";
import { ProcessControl } from "../Forms/controls/processControl";

interface props {
    company: Company,
    actions: {
        submitProcessSelection: any,
        SubmitInterview: any,
        deleteInformation: any,
        deleteInterview: any
    }
}

export const CompanyInterviews = ({ company, actions }: props) => {
    var date = new Date();
    console.log("esto es company interview y aqui tengo el id antes de enviarlo a processControl => : " + company.idCompany + "   Date:" + date + "MILISECS" +date.getMilliseconds());
    return (
        <div id="groupInterview" className="subBody">
            <ListGroup>
                <p>Nombre de compañia</p>
                <ListGroup.Item>{company.companyName}</ListGroup.Item>
            </ListGroup>
            <div>
               
                
                <ProcessControl companyName={company.companyName} idCompany={company.idCompany} />
            </div>
        </div>
    );
}
