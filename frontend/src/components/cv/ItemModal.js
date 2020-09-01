import React, { useState } from "react"
import useSWR from "swr"
import { get } from "../../utils/fetcher"
import Notification from "../Notification"

export default function ItemModal({ onSubmit, onClose, data }) {
  const [notification, setNotification] = useState(false)
  const [loading, setLoading] = useState(false)
  const { data: types } = useSWR("api/cv/types/", get, {
    initialData: [],
    revalidateOnMount: true,
  })
  let options = types.map(t => {
    return (
      <option key={t.id} value={t.id}>
        {t.name}
      </option>
    )
  })
  const [form, setForm] = useState(
    data !== undefined
      ? data
      : {
          title: "",
          description: "",
          link: "",
          location: "",
          category: 1,
          icon: "FaBookmark",
        }
  )

  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    if (onSubmit) {
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
          <h1 className="title">Create Item</h1>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                name="title"
                className="input"
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                name="description"
                className="textarea"
                placeholder="e.g. Hello world"
                value={form.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label">Location</label>
            <div className="control">
              <input
                name="location"
                className="input"
                type="text"
                placeholder="Everywhere!"
                value={form.location}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Link</label>
            <div className="control">
              <input
                name="link"
                className="input"
                type="text"
                placeholder="https://github.com/me/my-awesome-project"
                value={form.link}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <select
                name="category"
                className="input"
                type="select"
                value={form.category}
                onChange={handleInputChange}
              >
                {options}
              </select>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                name="item-submit"
                className={`button is-primary ${loading ? "is-loading" : ""}`}
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
