import {
  createFormInterView,
  createInformationDto,
  createInterViewDto
} from "../Models/modelFormInterView";

import { HttpDelete, HttpGet, HttpPost, HttpPut } from "./HttpService";
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
  return await HttpPost(endpoints.AddInterView, register)
  .then((response) => response.json())
  .then((response: Company) => response)
  .catch((rsjx) => {
    alert(rsjx);
    return rsjx.message;
  })
  .finally(() => (event.target as HTMLFormElement).reset());
}

export async function submitInterviewSameCompany(event: React.FormEvent<HTMLFormElement>): Promise<Interview> {
  event.preventDefault();
  let register = createInterViewDto(event.target);

  return await HttpPost(endpoints.AddInterViewCompany, register)
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
  let register = createInformationDto(event.target);
  return await HttpPost(endpoints.AddInterViewInformation, register)
    .then((response) => response.json())
    .then((response: InformationInterview) => response)
    .catch((rsjx) => {
      alert(rsjx);
      return rsjx.message;
    })
    .finally(() => (event.target as HTMLFormElement).reset());
}

export async function deleteInformationInterview(event: any , idInformation: number): Promise<InformationInterview> {
  event.preventDefault();
  return await HttpDelete(endpoints.DeleteInformationInterview, idInformation)
    .then((response) => response.json())
    .then((response: InformationInterview) => response)
    .catch((rsjx) => {
      alert(rsjx);
      return rsjx.message;
    })
}

export async function deleteInterviewDb(event: any , idInterview: number): Promise<Interview> {
  event.preventDefault();
  return await HttpDelete(endpoints.DeleteInterview, idInterview)
    .then((response) => response.json())
    .then((response: InformationInterview) => response)
    .catch((rsjx) => {
      alert(rsjx);
      return rsjx.message;
    })
}

export async function deleteCompanyDb(event: any , idInterview: number): Promise<Company> {
  event.preventDefault();
  return await HttpDelete(endpoints.DeleteCompany, idInterview)
    .then((response) => response.json())
    .then((response: InformationInterview) => response)
    .catch((rsjx) => {
      alert(rsjx);
      return rsjx.message;
    })
}

export async function updateInterviewInformation(event: any): Promise<InformationInterview> {
  event.preventDefault();
  let register = createInformationDto(event.target);
  return await HttpPut(endpoints.UpdateInterViewInformation, register)
    .then((response) => response.json())
    .then((response: InformationInterview) => response)
    .catch((rsjx) => {
      alert(rsjx);
      return rsjx.message;
    })
}