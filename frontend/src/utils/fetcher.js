function url(endpoint) {
  return process.env.REACT_APP_API_HOST
    ? new URL(endpoint, process.env.REACT_APP_API_HOST).href
    : endpoint
}

export async function get(endpoint) {
  let resp = await fetch(url(endpoint))

  if (resp.ok) {
    let json = await resp.json()
    return json
  } else {
    throw new APIException(resp)
  }
}

export async function post(endpoint, content, token) {
  return fetcher(endpoint, content, "POST", token)
}

export async function put(endpoint, content, token) {
  return fetcher(endpoint, content, "PUT", token)
}

export async function remove(endpoint, token) {
  return fetcher(endpoint, {}, "DELETE", token)
}

async function fetcher(endpoint, content, method, token) {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  let resp = await fetch(url(endpoint), {
    method: method,
    body: JSON.stringify(content),
    redirect: "follow",
    credentials: "same-origin",
    headers: headers,
  })
  if (resp.ok) {
    let json = await resp
      .text()
      .then(t => {
        return JSON.parse(t)
      })
      .catch(t => {
        console.error(t)
        return {}
      })
    return json
  } else {
    throw new APIException(resp)
  }
}

function APIException(response) {
  this.response = response
}
