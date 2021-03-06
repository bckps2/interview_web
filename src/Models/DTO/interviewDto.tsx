import { TypeInterView } from "../TypeInterView";

export interface CompanyDto {
    companyName : string,
    dateCreated : Date,
    interView : InterviewDto,
    idCompany: number
}

export interface InterviewDto {
    idInterView : number,
    companyIdCompany: number,
    informationInterView: InformationInterviewDto,
    rangeSalarial: string
}

export interface InformationInterviewDto {
    interViewIdInterView : number,
    typeInterView : TypeInterView,
    nameInterViewers: string[],
    dateInterView:Date,
    email:string,
    observations:string
}
