const API_BASE = process.env.REACT_APP_API_BASE
  ? process.env.REACT_APP_API_BASE
  : ""
const fetcher = (url, method) =>
  fetch(`${API_BASE}${url}/`, { method: method }).then(r => r.json())
const get = url => fetcher(url, "GET")
const post = url => fetcher(url, "POST")

export { get, post }
