import {
  createFormInterView,
  informationInterView,
  informationInterViewCompany
} from "../Models/ModelFormInterView";

import { HttpGet, HttpPost, HttpPut } from "./HttpService";
import { endpoints } from "../Models/Url";
import { Company, InformationInterview, Interview } from "../Models/InterviewModel";

export async function GetAllInterViews(): Promise<Company[]> {
  return await HttpGet(endpoints.GetAllInterViews).then((response) => {
    if (response.ok) {
      return response.json()
    }
  }).then((res: Company[]) => {
    return res;
  })
}

export async function addInterView(event: React.FormEvent<HTMLFormElement>): Promise<Company> {
  event?.preventDefault();
  let register = createFormInterView(event?.target ?? null);
  return await HttpPost(endpoints.AddInterView, register).then((response) => response.json())
  .then((response: Company) => response)
  .catch((rsjx) => {
    alert(rsjx);
    return rsjx.message;
  })
  .finally(() => (event.target as HTMLFormElement).reset());
}

export async function submitInterviewSameCompany(event: React.FormEvent<HTMLFormElement>): Promise<Interview> {
  event.preventDefault();
  let register = informationInterViewCompany(event.target);

  return await HttpPut(endpoints.AddInterViewCompany, register)
    .then((response) => response.json())
    .then((response: Interview) => response)
    .catch((rsjx) => {
      alert(rsjx);
      return rsjx.message;
    })
    .finally(() => (event.target as HTMLFormElement).reset());
}

export async function submitAddInformation(event: React.FormEvent<HTMLFormElement>): Promise<InformationInterview> {
  event.preventDefault();
  let register = informationInterView(event.target);
  return await HttpPut(endpoints.urlUpdateInterViewInformation, register)
    .then((response) => response.json())
    .then((response: InformationInterview) => response)
    .finally(() => (event.target as HTMLFormElement).reset());
}
