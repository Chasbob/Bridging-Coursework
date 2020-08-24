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

export async function post(endpoint, content) {
  let resp = await fetch(url(endpoint), {
    method: "POST",
    body: JSON.stringify(content),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    redirect: "follow",
  })
  if (resp.ok) {
    let json = await resp.json()
    return json
  } else {
    throw new APIException(resp)
  }
}

export async function put(endpoint, content) {
  let resp = await fetch(url(endpoint), {
    method: "PUT",
    body: JSON.stringify(content),
    redirect: "follow",
  })
  if (resp.ok) {
    let json = await resp.json()
    return json
  } else {
    throw new APIException(resp)
  }
}

export async function remove(endpoint) {
  let resp = await fetch(url(endpoint), {
    method: "DELETE",
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
