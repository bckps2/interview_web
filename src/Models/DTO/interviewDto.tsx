export interface CompanyDto {
    companyName: string,
    dateCreated: Date,
    idCompany: number
}

export interface InterviewDto {
    idProcess: number,
    typeInterView: string,
    nameInterViewers: string[],
    dateInterView: Date,
    email: string,
    observations: string,
    idInterview:number
}

export interface ProcessDto { 
    externalCompany: string,
    jobPosition: string;
    idProcess: number,
    idCompany: number,
    rangeSalarial: string
}
