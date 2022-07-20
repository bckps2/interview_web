import { CompanyDto, InformationInterviewDto, InterviewDto } from "./DTO/interviewDto";

interface company extends interview {
  companyName: { value: string };
}

interface interview extends informationInterview {
  externalCompany: { value: string };
  rangeSalarial: { value: string };
  idCompany: { value: number };
  dateInterview: { value: Date };
  jobPosition: { value: string };
}

interface informationInterview {
  entrevistador1: { value: string };
  entrevistador2: { value: string };
  entrevistador3: { value: string };
  typeInterView: { value: string };
  email: { value: string };
  dateInterview: { value: Date }
  idInterview: { value: number };
  observations: { value: string };
}

export function createFormInterView(eventTarget: EventTarget | null): CompanyDto {

  const target = eventTarget as typeof eventTarget & company

  let company = {} as CompanyDto;
  company.interView = {} as InterviewDto;
  company.interView.informationInterView = {} as InformationInterviewDto;
  company.interView.informationInterView.nameInterViewers = [] as string[];
  company.companyName = target.companyName.value;
  company.interView = createInterViewDto(eventTarget);
  return company;
};

export function createInterViewDto(eventTarget: EventTarget | null): InterviewDto {
  const target = eventTarget as typeof eventTarget & interview;
  let interview = {} as InterviewDto;
  interview.informationInterView = {} as InformationInterviewDto;
  interview.informationInterView.nameInterViewers = [] as string[];
  interview.externalCompany = target.externalCompany.value;
  interview.rangeSalarial = target.rangeSalarial.value;
  interview.companyIdCompany = target.idCompany?.value;
  interview.jobPosition = target.jobPosition.value;
  interview.informationInterView = createInformationDto(eventTarget);
  return interview;
};

export function createInformationDto(eventTarget: EventTarget | null): InformationInterviewDto {

  const target = eventTarget as typeof eventTarget & informationInterview;
  var informationInterView = {} as InformationInterviewDto;
  informationInterView.nameInterViewers = [] as string[];

  informationInterView.nameInterViewers.push(target.entrevistador1.value);
  informationInterView.nameInterViewers.push(target.entrevistador2.value);
  informationInterView.nameInterViewers.push(target.entrevistador3.value);
  informationInterView.email = target.email.value;
  informationInterView.dateInterView = target.dateInterview.value;
  informationInterView.observations = target.observations.value;
  informationInterView.interViewIdInterView = target.idInterview?.value;
  return informationInterView;
};
