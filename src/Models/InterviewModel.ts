import { TypeInterView } from "./TypeInterView";

export interface Company {
    companyName : string,
    dateCreated : Date,
    idCompany: number
    process:Process[]
}

export interface Process {
    idProcess:number,
    externalCompany:string,
    idInterView : number,
    idCompany: number,
    rangeSalarial: string,
    jobPosition: string
    interviews : Interview[]
}

export interface Interview {
    idProcess : number,
    typeInterView : TypeInterView,
    nameInterViewers: string[],
    dateInterView:Date,
    email:string,
    observations:string,
    idInterview:number
}
