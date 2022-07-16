import { CompanyDto, InformationInterviewDto, InterviewDto } from "./interviewDto";

export function createFormInterView(eventTarget: EventTarget | null): CompanyDto {

  const target = eventTarget as typeof eventTarget & company & informationInterview & interview

  let company = {} as CompanyDto;
  company.interView = {} as InterviewDto;
  company.interView.informationInterView = {} as InformationInterviewDto;
  company.interView.informationInterView.nameInterViewers = [] as string[];

  company.companyName = target.companyName.value;
  company.interView.rangeSalarial = target.rangeSalarial.value;
  company.interView.informationInterView.nameInterViewers.push(target.entrevistador1.value);
  company.interView.informationInterView.nameInterViewers.push(target.entrevistador2.value);
  company.interView.informationInterView.nameInterViewers.push(target.entrevistador3.value);
  company.interView.informationInterView.email = target.email.value;
  company.interView.informationInterView.observations = target.observations.value;
  company.interView.informationInterView.dateInterView = target.dateInterview.value;

  return company;
};

export function informationInterView(eventTarget: EventTarget | null): InformationInterviewDto {

  const target = eventTarget as typeof eventTarget & informationInterview;
  var informationInterView = {} as InformationInterviewDto;
  informationInterView.nameInterViewers = [] as string[];
  informationInterView.nameInterViewers.push(target.entrevistador1.value);
  informationInterView.nameInterViewers.push(target.entrevistador2.value);
  informationInterView.nameInterViewers.push(target.entrevistador3.value);
  informationInterView.email = target.email.value;
  informationInterView.dateInterView = target.dateInterview.value;
  informationInterView.observations = target.observations.value;
  informationInterView.interViewIdInterView = target.idInterview.value;
  return informationInterView;
};

export function informationInterViewCompany(eventTarget: EventTarget | null): InterviewDto {
  const target = eventTarget as typeof eventTarget & informationInterview & interview;
  let interview = {} as InterviewDto;
  interview.informationInterView = {} as InformationInterviewDto;
  interview.informationInterView.nameInterViewers = [] as string[];
  interview.rangeSalarial = target.rangeSalarial.value;
  interview.companyIdCompany = target.idCompany.value;
  interview.informationInterView.nameInterViewers.push(target.entrevistador1.value);
  interview.informationInterView.nameInterViewers.push(target.entrevistador2.value);
  interview.informationInterView.nameInterViewers.push(target.entrevistador3.value);
  interview.informationInterView.dateInterView = target.dateInterview.value;
  interview.informationInterView.email = target.email.value;
  interview.informationInterView.observations = target.observations.value;
  return interview;
};

interface company {
  companyName: { value: string };
}

interface interview {
  rangeSalarial: { value: string };
  idCompany: { value: number };
  dateInterview: { value: Date };
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