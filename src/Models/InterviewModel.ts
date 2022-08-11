import { TypeInterView } from "./TypeInterView";

export interface Company {
    companyName : string,
    dateCreated : Date,
    idCompany: number
}

export interface Process {
    externalCompany:string,
    idInterView : number,
    companyIdCompany: number,
    rangeSalarial: string,
    jobPosition: string
}

export interface Interview {
    interViewIdInterView : number,
    typeInterView : TypeInterView,
    nameInterViewers: string[],
    dateInterView:Date,
    email:string,
    observations:string,
    idInformation:number
}
