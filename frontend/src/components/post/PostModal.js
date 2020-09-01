import React, { useState } from "react"
import moment from "moment"
import Notification from "../Notification"

export default function PostModal({ onSubmit, onClose, data }) {
  const [notification, setNotification] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(
    data !== undefined
      ? data
      : {
          title: "",
          text: "",
          created_date: new Date(),
          published_date: new Date(),
          author:
            localStorage.getItem("user") !== null
              ? JSON.parse(localStorage.getItem("user")).pk
              : 0,
        }
  )

  const handleSubmit = event => {
    event.preventDefault()
    setNotification(false)
    if (onSubmit) {
      form.published_date = moment(form.published_date).format(
        "YYYY-MM-DD HH:mm"
      )
      form.created_date = moment(form.created_date).format("YYYY-MM-DD HH:mm")
      onSubmit(form)
        .then(onClose)
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
          <h1 className="title">Create Post</h1>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                name="title"
                className="input"
                type="text"
                placeholder="Post Title"
                value={form.title}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Text</label>
            <div className="control">
              <textarea
                name="text"
                className="textarea"
                rows="10"
                placeholder="e.g. Hello world"
                value={form.text}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label">Published date</label>
            <div className="control">
              <input
                name="published_date"
                type="date"
                className="date input"
                value={form.published_date}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Created date</label>
            <div className="control">
              <input
                name="created_date"
                type="date"
                className="date input"
                value={form.created_date}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className={`button is-primary ${loading ? "is-loading" : ""}`}
                name="post-submit"
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
