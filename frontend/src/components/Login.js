import React, { useState } from "react"
import useSWR, { mutate } from "swr"
import { post } from "../utils/fetcher"
import Notification from "./Notification"

export default function Login() {
  const url = null

  const { data: authenticated } = useSWR(
    "authenticated",
    () => (localStorage.getItem("token") !== null ? true : false),
    {
      initialData: false,
      revalidateOnMount: true,
    }
  )

  useSWR(authenticated ? "token" : null, () => localStorage.getItem("token"), {
    onSuccess: async data => {
      post("api/auth/token/verify/", { token: data }, false)
        .then(() => {})
        .catch(handelRefresh)
    },
  })

  const [modalActive, setModalActive] = useState(false)
  const handleModalOpen = () => {
    setModalActive(true)
  }

  const handleModalClose = () => {
    setModalActive(false)
  }

  const handelLogout = async () => {
    localStorage.clear()
    mutate("authenticated")
    mutate("token")
    mutate("refresh")
  }

  const handelRefresh = async () => {
    await post(
      "api/auth/token/refresh/",
      { refresh: localStorage.getItem("refresh") },
      false
    )
      .then(json => {
        localStorage.setItem("token", json.access)
        mutate("token")
      })
      .catch(handelLogout)
  }

  const handelModalSubmit = async form => {
    await post("api/auth/login/", form, false).then(json => {
      localStorage.setItem("token", json.access_token)
      localStorage.setItem("refresh", json.refresh_token)
      localStorage.setItem("user", JSON.stringify(json.user))
      mutate("token")
    })
  }

  if (authenticated) {
    return (
      <div>
        <a
          href={url}
          name="logout"
          className="is-link is-family-code"
          onClick={handelLogout}
        >
          Logout
        </a>
      </div>
    )
  }
  return (
    <div>
      <a
        name="login"
        href={url}
        className="is-link is-family-code"
        onClick={handleModalOpen}
      >
        Login
      </a>
      {modalActive && (
        <LoginForm onSubmit={handelModalSubmit} onClose={handleModalClose} />
      )}
    </div>
  )
}

function LoginForm({ onSubmit, onClose }) {
  const [notification, setNotification] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = event => {
    event.preventDefault()
    setNotification(false)
    setLoading(true)
    if (onSubmit) {
      onSubmit(form)
        .then(() => mutate("authenticated"))
        .catch(e => {
          setLoading(false)
          e.response.text().then(t => setNotification(t))
        })
    }
  }

  const handleInputChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
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
              <button
                className={`button is-primary ${loading ? "is-loading" : ""}`}
                name="login-submit"
                type="submit"
                value="Submit"
              >
                Submit
              </button>
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
