import React, { useState } from "react"
import { post } from "../utils/fetcher"
import { useCookies } from "react-cookie"

export default function Login() {
  const [cookies, setCookie] = useCookies(["token"])
  const [modalActive, setModalActive] = useState(false)
  const [notification, setNotification] = useState("")
  const handleModalOpen = () => {
    setModalActive(true)
  }

  const handleModalClose = () => {
    setModalActive(false)
  }

  const handelModalSubmit = async form => {
    await post("api-auth/login/", form, false)
      .then(resp => {
        setCookie("access_token", resp.access_token)
        setCookie("refresh_token", resp.refresh_token)
        setCookie("user", resp.user)
        setModalActive(false)
      })
      .catch(e => {
        console.error(e)
      })
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
        />
      )}
    </div>
  )
}

function LoginForm({ onSubmit, onClose, notification }) {
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

  const handleInputChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        {notification && (
          <div className="notification is-danger">
            <div className="delete" />
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
