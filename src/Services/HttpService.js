function requestHttp(url, typeRequest, body, token) {
    switch (typeRequest) {
      case "get":
        return requestGet(url,token);
      case "post":
        return requestPost(url, body, token);
      default:
        return null;
    }
  }
  
  function requestGet(url, token) {
    return fetch(url, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + token 
      }
    });
  }
  
  function requestPost(url, info, token) {
    return fetch(url, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + token 
      },
      body: JSON.stringify(info)
    });
  }
  
  export default requestHttp;
  