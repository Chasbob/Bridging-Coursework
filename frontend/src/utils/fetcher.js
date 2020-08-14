const API_BASE = process.env.REACT_APP_API_BASE
const fetcher = url => fetch(`${API_BASE}${url}/`).then(r => r.json())
export default fetcher
