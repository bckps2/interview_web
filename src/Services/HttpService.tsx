
export function HttpGet(url: string) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export function HttpPost(url: string, info : any) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(info),
  });
}

export function HttpPut(url: string, info : any) {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(info),
  });
}

