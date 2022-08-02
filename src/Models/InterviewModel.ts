import { TypeInterView } from "./TypeInterView";

export interface Company {
    companyName : string,
    dateCreated : Date,
    idCompany: number
}

export interface Interview {
    externalCompany:string,
    idInterView : number,
    companyIdCompany: number,
    rangeSalarial: string,
    jobPosition: string
}

export interface InformationInterview {
    interViewIdInterView : number,
    typeInterView : TypeInterView,
    nameInterViewers: string[],
    dateInterView:Date,
    email:string,
    observations:string,
    idInformation:number
}
