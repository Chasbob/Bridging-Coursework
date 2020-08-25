function url(endpoint) {
  return process.env.REACT_APP_API_HOST
    ? new URL(endpoint, process.env.REACT_APP_API_HOST).href
    : endpoint
}

export async function get(endpoint) {
  // return fetcher(endpoint,"GET", false, false)
  let resp = await fetch(url(endpoint), {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })

  if (resp.ok) {
    let json = await resp.json()
    return json
  } else {
    throw new APIException(resp)
  }
}

export async function post(endpoint, content, token) {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  let resp = await fetch(url(endpoint), {
    method: "POST",
    body: JSON.stringify(content),
    redirect: "follow",
    headers: headers,
  })
  if (resp.ok) {
    let json = await resp.json()
    return json
  } else {
    throw new APIException(resp)
  }
}

export async function put(endpoint, content, token) {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  let resp = await fetch(url(endpoint), {
    method: "PUT",
    body: JSON.stringify(content),
    redirect: "follow",
    headers: headers,
  })
  if (resp.ok) {
    let json = await resp.json()
    return json
  } else {
    throw new APIException(resp)
  }
}

export async function remove(endpoint, token) {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  let resp = await fetch(url(endpoint), {
    method: "DELETE",
    redirect: "follow",
    headers: headers,
  })
  if (resp.ok) {
    let json = await resp.json()
    return json
  } else {
    throw new APIException(resp)
  }
}

export default async function fetcher(endpoint, method, content, token) {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  let resp = await fetch(url(endpoint), {
    method: method,
    body: content !== false ? JSON.stringify(content) : "",
    redirect: "follow",
    headers: headers,
  })
  if (resp.ok) {
    let json = await resp.json()
    return json
  } else {
    throw new APIException(resp)
  }
}

function APIException(response) {
  this.response = response
}
