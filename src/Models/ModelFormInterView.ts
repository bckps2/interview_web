import { CompanyDto, InterviewDto, ProcessDto } from "./DTO/interviewDto";

interface company {
  companyName: { value: string };
}

interface Process {
  externalCompany: { value: string };
  rangeSalarial: { value: string };
  idCompany: { value: number };
  dateInterview: { value: Date };
  jobPosition: { value: string };
}

interface Interview {
  entrevistador1: { value: string };
  entrevistador2: { value: string };
  entrevistador3: { value: string };
  typeInterView: { value: string };
  email: { value: string };
  dateInterview: { value: Date }
  idInterview: { value: number };
  idProcess: { value: number };
  observations: { value: string };
}

export function createCompanyDto(eventTarget: EventTarget | null): CompanyDto {
  const target = eventTarget as typeof eventTarget & company
  let company = {} as CompanyDto;
  company.companyName = target.companyName.value;
  return company;
};

export function createProcessDto(eventTarget: EventTarget | null): ProcessDto {
  const target = eventTarget as typeof eventTarget & Process;
  let process = {} as ProcessDto;
  process.externalCompany = target.externalCompany.value;
  process.rangeSalarial = target.rangeSalarial.value;
  process.idCompany = target.idCompany?.value;
  process.jobPosition = target.jobPosition.value;
  return process;
};

export function createInterviewDto(eventTarget: EventTarget | null): InterviewDto {

  const target = eventTarget as typeof eventTarget & Interview;
  var interviewDto = {} as InterviewDto;

  interviewDto.nameInterViewers = [] as string[];
  interviewDto.nameInterViewers.push(target.entrevistador1.value);
  interviewDto.nameInterViewers.push(target.entrevistador2.value);
  interviewDto.nameInterViewers.push(target.entrevistador3.value);
  interviewDto.email = target.email.value;
  interviewDto.dateInterView =  FormatDateToSave(target.dateInterview.value);
  interviewDto.observations = target.observations.value;
  interviewDto.idInterview = target.idInterview.value.toString().length > 0 ?  target.idInterview.value : 0;
  interviewDto.idProcess = target.idProcess?.value;
  interviewDto.typeInterView = target.typeInterView.value;
  return interviewDto;
};

function FormatDateToSave(date: Date) : string{
  var dateParts = date.toString().substring(0,10).replace(',','').split('-');
  return dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
}