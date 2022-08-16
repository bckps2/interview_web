import { TypeInterView } from "../TypeInterView";

export interface CompanyDto {
    companyName: string,
    dateCreated: Date,
    idCompany: number
}

export interface InterviewDto {
    interViewIdInterView: number,
    typeInterView: string,
    nameInterViewers: string[],
    dateInterView: Date,
    email: string,
    observations: string,
    IdInterview:number
}

export interface ProcessDto {
    externalCompany: string,
    jobPosition: string;
    idProcess: number,
    companyIdCompany: number,
    rangeSalarial: string
}
