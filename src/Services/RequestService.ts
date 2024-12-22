import {
  createCompanyDto,
  createInterviewDto,
  createProcessDto
} from "../Models/ModelFormInterView";

import { HttpDelete, HttpGet, HttpPost, HttpPut } from "./HttpService";

export async function GetAll(endpoint: string): Promise<any[] | any> {
  return await HttpGet(endpoint)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        alert(response.status);
      }
    }).then((res: any[]) => {
      return res;
    }).catch((rsjx) => {
      alert(rsjx);
    })
}

export async function GetById(endpoint: string, id: number): Promise<any> {
  return await HttpGet(endpoint + '/' + id).then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      alert(response.status);
    }
  }).then((res: any) => {
    return res;
  }).catch((rsjx) => {
    alert(rsjx);
  })
}

export async function requestAdd(endpoint: string, type: string, event: React.FormEvent<HTMLFormElement>):Promise<any> {
  event?.preventDefault();
  let body = CreateBody(type, event);

  return await HttpPost(endpoint, body)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert(response.status);
      }
    }).then((response: any) => response)
    .catch((rsjx) => {
      alert(rsjx);
    })
    .finally(() => (event.target as HTMLFormElement).reset());
}

export async function requestUpdate(endpoint: string, type: string, event: React.FormEvent<HTMLFormElement>): Promise<any> {
  event?.preventDefault();
  let body = CreateBody(type, event);

  return await HttpPut(endpoint, body)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert(response.status);
      }
    }).then((response: any) => response)
    .catch((rsjx) => {
      alert(rsjx);
    })
    .finally(() => (event.target as HTMLFormElement).reset());
}


export async function requestDelete(event: any, enpoint: string, idToDelete: number): Promise<any> {
  event.preventDefault();
  return await HttpDelete(enpoint, idToDelete)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert(response.status);
      }
    })
    .then((response: any) => response)
    .catch((rsjx) => {
      alert(rsjx);
    })
}

function CreateBody(type: string, event: React.FormEvent<HTMLFormElement>): any {
  let body: any;
  switch (type) {
    case 'company':
      body = createCompanyDto(event?.target ?? null);
      break;
    case 'process':
      body = createProcessDto(event?.target ?? null);
      break;
    case 'interview':
      body = createInterviewDto(event.target);
      break;
  }
  return body;
}