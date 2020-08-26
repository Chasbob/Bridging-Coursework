import React, { useState } from "react"
import useSWR from "swr"
import fetcher, { post } from "../utils/fetcher"

export default function Login({ authenticated, setAuthenticated }) {
  const url = null
  const [token, setToken] = useState(
    authenticated ? localStorage.getItem("token") : ""
  )
  const [refresh, setRefresh] = useState(
    authenticated ? localStorage.getItem("refresh") : ""
  )
  const [modalActive, setModalActive] = useState(false)
  const [notification, setNotification] = useState(false)
  const handleModalOpen = () => {
    setModalActive(true)
  }

  const handleModalClose = () => {
    setModalActive(false)
  }

  const handelLogout = async () => {
    await fetcher("api/auth/logout/", "POST", false, false)
    localStorage.clear()
    setAuthenticated(false)
  }

  const handelRefresh = async () => {
    await post("api/auth/token/refresh/", { refresh: refresh }, false)
      .then(json => {
        localStorage.setItem("token", json.access)
        setToken(json.access)
      })
      .catch(e => console.error("refresh", e))
  }

  useSWR(
    authenticated ? ["api/auth/token/verify/", { token: token }, false] : null,
    post,
    {
      revalidateOnMount: true,
      onError: handelRefresh,
    }
  )

  const handelModalSubmit = async form => {
    setNotification(null)
    await fetcher("api/auth/login/", "POST", form, false)
      .then(json => {
        localStorage.setItem("token", json.access_token)
        localStorage.setItem("refresh", json.refresh_token)
        localStorage.setItem("user", JSON.stringify(json.user))
        setToken(json.access_token)
        setRefresh(json.refresh_token)
        setAuthenticated(true)
        setModalActive(false)
      })
      .catch(e => console.error(e))
  }

  if (authenticated) {
    return (
      <div>
        <a href={url} className="is-link" onClick={handelLogout}>
          Logout
        </a>
      </div>
    )
  }
  return (
    <div>
      <a href={url} className="is-link" onClick={handleModalOpen}>
        Login
      </a>
      {modalActive && (
        <LoginForm
          onSubmit={handelModalSubmit}
          onClose={handleModalClose}
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </div>
  )
}

function LoginForm({ onSubmit, onClose, notification, setNotification }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = event => {
    event.preventDefault()
    if (onSubmit) {
      onSubmit(form)
    }
  }

  const handelNotificationClose = () => {
    setNotification(false)
  }

  const handleInputChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        {notification && (
          <div className="notification is-danger">
            <button className="delete" onClick={handelNotificationClose} />
            <p>{notification}</p>
          </div>
        )}
        <form className="box" onSubmit={handleSubmit}>
          <h1 className="title">Login</h1>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                name="username"
                className="input"
                type="text"
                placeholder="username"
                value={form.username}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                name="password"
                className="input"
                type="password"
                placeholder="password"
                value={form.password}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="button is-primary"
                type="submit"
                value="Submit"
              ></input>
            </div>
          </div>
        </form>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={onClose}
      ></button>
    </div>
  )
}
