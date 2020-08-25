import React, { useState } from "react"
import fetcher from "../utils/fetcher"
import { useCookies } from "react-cookie"

export default function Login({ authenticated, setAuthenticated }) {
  const [cookies, setCookie, removeCookie] = useCookies(["access"])
  const [modalActive, setModalActive] = useState(false)
  const [notification, setNotification] = useState(false)
  const handleModalOpen = () => {
    setModalActive(true)
  }

  const handleModalClose = () => {
    setModalActive(false)
  }

  const handelLogout = async () => {
    await fetcher("api-auth/logout/", "POST", false, false)
    removeCookie("access")
    setAuthenticated(false)
  }

  const handelModalSubmit = async form => {
    setNotification(null)
    await fetcher("api-auth/login/", "POST", form, false)
      .then(json => {
        setCookie("access", json, {
          sameSite: "strict",
          maxAge: "2592000",
          secure: true,
        })
        setAuthenticated(true)
        setModalActive(false)
      })
      .catch(e => console.error(e))
  }

  if (authenticated) {
    return (
      <div>
        <a className="is-link" onClick={handelLogout}>
          Logout
        </a>
      </div>
    )
  }
  return (
    <div>
      <a className="is-link" onClick={handleModalOpen}>
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
