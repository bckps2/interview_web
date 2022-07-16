import { Company, InformationInterview, Interview } from "./InterviewModel";

export function createFormInterView(eventTarget: EventTarget | null): Company {

  const target = eventTarget as typeof eventTarget & company & informationInterview & interview

  let company = {} as Company;
  company.interViews = [] as Interview[];
  company.interViews[0] = {} as Interview;
  company.interViews[0].informationInterViews = [] as InformationInterview[];
  company.interViews[0].informationInterViews[0] = {} as InformationInterview;
  company.interViews[0].informationInterViews[0].nameInterViewers = [] as string[];

  company.companyName = target.companyName.value;
  company.interViews[0].rangeSalarial = target.rangeSalarial.value;
  company.interViews[0].informationInterViews[0].nameInterViewers.push(target.entrevistador1.value);
  company.interViews[0].informationInterViews[0].nameInterViewers.push(target.entrevistador2.value);
  company.interViews[0].informationInterViews[0].nameInterViewers.push(target.entrevistador3.value);
  company.interViews[0].informationInterViews[0].email = target.email.value;
  company.interViews[0].informationInterViews[0].observations = target.observations.value;
  company.interViews[0].informationInterViews[0].dateInterView = target.dateInterview.value;
  
  return company;

};

export function informationInterView(eventTarget: EventTarget | null): InformationInterview {

  const target = eventTarget as typeof eventTarget & informationInterview;
  var informationInterView = {} as InformationInterview;
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

export function informationInterViewCompany(eventTarget: EventTarget | null): Interview {

  const target = eventTarget as typeof eventTarget & informationInterview & interview;

  let interview = {} as Interview;
  interview.informationInterViews = [] as InformationInterview[];
  interview.informationInterViews[0] = {} as InformationInterview;
  interview.informationInterViews[0].nameInterViewers = [] as string[];
  interview.rangeSalarial = target.rangeSalarial.value;
  interview.companyIdCompany = target.idCompany.value;
  interview.informationInterViews[0].nameInterViewers.push(target.entrevistador1.value);
  interview.informationInterViews[0].nameInterViewers.push(target.entrevistador2.value);
  interview.informationInterViews[0].nameInterViewers.push(target.entrevistador3.value);
  interview.informationInterViews[0].dateInterView = target.dateInterview.value;
  interview.informationInterViews[0].email = target.email.value;
  interview.informationInterViews[0].observations = target.observations.value;

  return interview;
};

interface interview {
  rangeSalarial: { value: string };
  idCompany: { value: number };
  dateInterview: { value: Date };
}

interface company {
  companyName: { value: string };
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