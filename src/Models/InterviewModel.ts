import { TypeInterView } from "./TypeInterView";

export interface Company {
    companyName : string,
    dateCreated : Date,
    interViews : Interview[],
    idCompany: number
}

export interface Interview {
    externalCompany:string,
    idInterView : number,
    companyIdCompany: number,
    informationInterViews: InformationInterview[],
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
