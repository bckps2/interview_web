import { Company, InformationInterview, Interview } from "./InterviewModel";

export function createFormInterView (eventTarget: EventTarget | null): Company {

  const target = eventTarget as typeof eventTarget & {
    company: Company,
    interview: Interview, 
    informationInterview: InformationInterview
  };

  let company = {} as Company;

  company = target.company;
  company.interViews[0] = target.interview;
  company.interViews[0].informationInterViews[0] = target.informationInterview
  return company;

};

export function informationInterView (eventTarget: EventTarget | null): InformationInterview {

  const target = eventTarget as typeof eventTarget & {
    informationInterview: InformationInterview
  };

  return target.informationInterview;
};

export function informationInterViewCompany(eventTarget: EventTarget | null): Interview {

  const target = eventTarget as typeof eventTarget & informationInterview;

  let interview = {} as Interview;
  interview.informationInterViews = [] as InformationInterview[];
  interview.informationInterViews[0] = {} as InformationInterview;
  interview.informationInterViews[0].nameInterViewers = [] as string[];
  
  interview.rangeSalarial = target.rangeSalarial.value;
  interview.companyIdCompany = target.idCompany.value;
  interview.informationInterViews[0].nameInterViewers.push(target.entrevistador1.value);
  interview.informationInterViews[0].nameInterViewers.push(target.entrevistador2.value);
  interview.informationInterViews[0].nameInterViewers.push(target.entrevistador3.value);
  interview.informationInterViews[0].email = target.email.value;
  interview.informationInterViews[0].observations = target.observations.value;

  return interview;
};


interface informationInterview {
  rangeSalarial: { value: string };
  entrevistador1:{ value: string };
  entrevistador2:{ value: string };
  entrevistador3:{ value: string };
  typeInterView:{ value: string };
  email:{ value: string };
  idCompany:{ value: number };
  observations:{ value: string };
}