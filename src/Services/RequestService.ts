import {
  createCompanyDto,
  createInterviewDto,
  createProcessDto
} from "../Models/ModelFormInterView";

import { HttpDelete, HttpGet, HttpPost, HttpPut } from "./HttpService";
import { endpointsCompany, endpointsInterview, endpointsProcess } from "../Models/Url";
import { Company, Process, Interview } from "../Models/InterviewModel";

export async function GetAllICompanies(): Promise<Company[]> {
  return await HttpGet(endpointsCompany.GetAllCompanies).then((response) => {
    if (response.ok) {
      return response.json()
    }
  }).then((res: Company[]) => {
    return res;
  })
} 

export async function GetAllProcessByCompany(idCompany:number): Promise<Process[]> {
  return await HttpGet(endpointsProcess.GetByIdCompany+'/'+idCompany).then((response) => {
    if (response.ok) {
      return response.json()
    }
  }).then((res: Process[]) => {
    return res;
  })
}

export async function GetAllInterviewsByProcess(idInterview:number): Promise<Interview[]> {
  return await HttpGet(endpointsInterview.GetByIdProcess+'/'+idInterview).then((response) => {
    if (response.ok) {
      return response.json()
    }
  }).then((res: Interview[]) => {
    return res;
  })
}

export async function addCompany(event: React.FormEvent<HTMLFormElement>): Promise<Company> {
  event?.preventDefault();
  let register = createCompanyDto(event?.target ?? null);
  return await HttpPost(endpointsCompany.AddCompany, register)
  .then((response) => response.json())
  .then((response: Company) => response)
  .catch((rsjx) => {
    alert(rsjx);
    return rsjx.message;
  })
  .finally(() => (event.target as HTMLFormElement).reset());
}

export async function addProcess(event: React.FormEvent<HTMLFormElement>): Promise<Process> {
  event?.preventDefault();
  let register = createProcessDto(event?.target ?? null);
  return await HttpPost(endpointsProcess.AddProcess, register)
  .then((response) => response.json())
  .then((response: Process) => response)
  .catch((rsjx) => {
    alert(rsjx);
    return rsjx.message;
  })
  .finally(() => (event.target as HTMLFormElement).reset());
}

export async function addInterview(event: React.FormEvent<HTMLFormElement>): Promise<Interview> {
  event.preventDefault();
  let register = createInterviewDto(event.target);

  return await HttpPost(endpointsInterview.AddInterview, register)
    .then((response) => response.json())
    .then((response: Interview) => response)
    .catch((rsjx) => {
      alert(rsjx);
      return rsjx.message;
    })
    .finally(() => (event.target as HTMLFormElement).reset());
}

export async function deleteProcess(event: any , idInformation: number): Promise<Process> {
  event.preventDefault();
  return await HttpDelete(endpointsProcess.DeleteProcess, idInformation)
    .then((response) => response.json())
    .then((response: Process) => response)
    .catch((rsjx) => {
      alert(rsjx);
      return rsjx.message;
    })
}

export async function deleteInterview(event: any , idInterview: number): Promise<Interview> {
  event.preventDefault();
  return await HttpDelete(endpointsInterview.DeleteInterview, idInterview)
    .then((response) => response.json())
    .then((response: Process) => response)
    .catch((rsjx) => {
      alert(rsjx);
      return rsjx.message;
    })
}

export async function deleteCompany(event: any , idInterview: number): Promise<Company> {
  event.preventDefault();
  return await HttpDelete(endpointsCompany.DeleteCompany, idInterview)
    .then((response) => response.json())
    .then((response: Process) => response)
    .catch((rsjx) => {
      alert(rsjx);
      return rsjx.message;
    })
}

// export async function updateInterviewInformation(event: any): Promise<Process> {
//   event.preventDefault();
//   let register = createInformationDto(event.target);
//   return await HttpPut(endpointsInterview., register)
//     .then((response) => response.json())
//     .then((response: Process) => response)
//     .catch((rsjx) => {
//       alert(rsjx);
//       return rsjx.message;
//     })
// }