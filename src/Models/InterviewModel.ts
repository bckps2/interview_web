import { TypeInterView } from "./TypeInterView";

export interface Companies {
    companies: Company[]
}

export interface Company {
    companyName : string,
    dateCreated : Date,
    interViews : Interview[],
    idCompany: number
}

export interface Interview {
    idInterView : number,
    companyIdCompany: number,
    informationInterViews: InformationInterview[],
    rangeSalarial: string
}

export interface InformationInterview {
    interViewIdInterView : number,
    typeInterView : TypeInterView,
    nameInterViewers: string[],
    dateInterView:Date,
    email:string,
    observations:string
}
