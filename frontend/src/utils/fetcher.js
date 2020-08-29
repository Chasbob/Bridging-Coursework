function url(endpoint) {
  return process.env.REACT_APP_API_HOST
    ? new URL(endpoint, process.env.REACT_APP_API_HOST).href
    : endpoint
}

export async function get(endpoint) {
  return base(endpoint, false, false, "GET")
}

export async function post(endpoint, content, token) {
  return base(endpoint, content, token, "POST")
}

export async function put(endpoint, content, token) {
  return base(endpoint, content, token, "PUT")
}
export async function remove(endpoint, token) {
  return base(endpoint, false, token, "DELETE")
}

async function base(endpoint, content, token, method) {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  let resp
  if (!content) {
    resp = await fetch(url(endpoint), {
      method: method,
      redirect: "follow",
      headers: headers,
    })
  } else {
    resp = await fetch(url(endpoint), {
      method: method,
      body: JSON.stringify(content),
      redirect: "follow",
      headers: headers,
    })
  }
  if (resp.ok) {
    if (resp.status === 204) {
      return {}
    }
    let json = await resp.json().catch(e => {
      throw new APIException(e)
    })
    return json
  } else {
    throw new APIException(resp)
  }
}

function APIException(response) {
  this.response = response
}
